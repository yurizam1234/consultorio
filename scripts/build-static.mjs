// Export estático del sitio a out/ (output: "export" en next.config.ts).
//
// Es un script propio y no un "next build" pelado por un motivo concreto: el
// worker de TypeScript de Next arranca con el heap por defecto de Node (~4 GB
// en esta máquina) y, cuando el sistema ya tiene la RAM ocupada, muere con
// "FATAL ERROR: Zone Allocation failed - process out of memory" sin llegar a
// compilar. Fijarle un techo bajo evita esa reserva imposible y el build pasa.
//
// Tampoco se resuelve con "NODE_OPTIONS=... next build" en package.json: en
// Windows los scripts de npm corren en cmd.exe, que no entiende el prefijo de
// variable de entorno. Lanzar el binario de Next desde Node es además la forma
// que documenta la propia versión instalada para pasarle flags al build
// (node_modules/next/dist/docs/01-app/02-guides/memory-usage.md).

import { spawn } from "node:child_process";
import { readdirSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";

// Subir este número sólo si el build se queda corto de memoria; bajarlo si la
// máquina está muy cargada. 2048 MB es lo que aguanta el proyecto hoy.
const HEAP_MB = Number(process.env.BUILD_HEAP_MB ?? 2048);
const OUT_DIR = "out";

const nextBin = createRequire(import.meta.url).resolve("next/dist/bin/next");

// Se respeta lo que el usuario ya tuviera en NODE_OPTIONS; el techo va al final
// para que gane sobre un --max-old-space-size previo.
const nodeOptions = [process.env.NODE_OPTIONS, `--max-old-space-size=${HEAP_MB}`]
  .filter(Boolean)
  .join(" ");

function dirSizeBytes(dir) {
  let bytes = 0;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    bytes += entry.isDirectory() ? dirSizeBytes(path) : statSync(path).size;
  }
  return bytes;
}

console.log(`\n▲ Export estático → ${OUT_DIR}/  (heap Node: ${HEAP_MB} MB)\n`);

const build = spawn(process.execPath, [nextBin, "build", ...process.argv.slice(2)], {
  stdio: "inherit",
  env: { ...process.env, NODE_OPTIONS: nodeOptions },
});

build.on("error", (error) => {
  console.error(`\n✗ No se pudo lanzar next build: ${error.message}\n`);
  process.exit(1);
});

build.on("exit", (code, signal) => {
  if (signal || code !== 0) {
    // Código 134 = SIGABRT: casi siempre el worker quedándose sin memoria.
    if (code === 134) {
      console.error(
        `\n✗ El build se quedó sin memoria. Cierra aplicaciones pesadas o baja el techo:` +
          `\n  BUILD_HEAP_MB=1536 npm run build:static\n`
      );
    }
    process.exit(code ?? 1);
  }

  try {
    console.log(`\n✓ Listo: ${OUT_DIR}/ (${(dirSizeBytes(OUT_DIR) / 1048576).toFixed(0)} MB)\n`);
  } catch {
    console.log(`\n✓ Listo: ${OUT_DIR}/\n`);
  }
});
