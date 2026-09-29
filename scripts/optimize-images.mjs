import sharp from "sharp";
import { readdirSync, statSync, readFileSync, writeFileSync } from "node:fs";
import { join, extname } from "node:path";

const IMAGE_EXTS = new Set([".webp", ".png", ".jpg", ".jpeg"]);

function getFiles(dir) {
  let files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(getFiles(fullPath));
    } else if (IMAGE_EXTS.has(extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }
  return files;
}

async function optimizeAll() {
  const files = getFiles("public");
  let totalOriginalBytes = 0;
  let totalOptimizedBytes = 0;
  let optimizedCount = 0;

  console.log(`\n🚀 Iniciando optimización inteligente de ${files.length} imágenes en public/...\n`);

  for (const file of files) {
    const originalSize = statSync(file).size;
    totalOriginalBytes += originalSize;

    const ext = extname(file).toLowerCase();
    const relPath = file.replace(/^public[\\/]/, "");

    try {
      const inputBuffer = readFileSync(file);
      const meta = await sharp(inputBuffer).metadata();

      let pipeline = sharp(inputBuffer);

      // Limitar dimensiones máximas según el tipo de imagen
      // Staff / equipo / avatares: max 700px (en pantalla miden ~300px, 700px es > 2x retina)
      // Fotos de instalaciones / hero: max 1440px
      // Thumbs: max 400px
      let maxDim = 1440;
      if (relPath.includes("thumb") || relPath.includes("-thumb")) {
        maxDim = 360;
      } else if (relPath.includes("nuestro-equipo") || relPath.includes("atender")) {
        maxDim = 720;
      } else if (relPath.includes("aseguradora") || relPath.includes("ico") || relPath.includes("img\\logo")) {
        maxDim = 600;
      }

      if (meta.width && meta.height && (meta.width > maxDim || meta.height > maxDim)) {
        if (meta.width >= meta.height) {
          pipeline = pipeline.resize({ width: maxDim, withoutEnlargement: true });
        } else {
          pipeline = pipeline.resize({ height: maxDim, withoutEnlargement: true });
        }
      }

      let optimizedBuffer;
      if (ext === ".webp") {
        optimizedBuffer = await pipeline
          .webp({
            quality: 78,
            effort: 6,
            smartSubsample: true,
            alphaQuality: 85,
          })
          .toBuffer();
      } else if (ext === ".png") {
        optimizedBuffer = await pipeline
          .png({
            compressionLevel: 9,
            adaptiveFiltering: true,
            quality: 80,
            effort: 6,
          })
          .toBuffer();
      } else if (ext === ".jpg" || ext === ".jpeg") {
        optimizedBuffer = await pipeline
          .jpeg({
            quality: 78,
            progressive: true,
            mozjpeg: true,
          })
          .toBuffer();
      }

      if (optimizedBuffer && optimizedBuffer.length < originalSize) {
        writeFileSync(file, optimizedBuffer);
        totalOptimizedBytes += optimizedBuffer.length;
        optimizedCount++;
        const savedPercent = (((originalSize - optimizedBuffer.length) / originalSize) * 100).toFixed(0);
        console.log(`✓ ${relPath}: ${(originalSize / 1024).toFixed(1)} KB → ${(optimizedBuffer.length / 1024).toFixed(1)} KB (-${savedPercent}%)`);
      } else {
        totalOptimizedBytes += originalSize;
        console.log(`- ${relPath}: ya estaba óptima (${(originalSize / 1024).toFixed(1)} KB)`);
      }
    } catch (err) {
      totalOptimizedBytes += originalSize;
      console.error(`✗ Error en ${relPath}: ${err.message}`);
    }
  }

  const savedMb = ((totalOriginalBytes - totalOptimizedBytes) / (1024 * 1024)).toFixed(2);
  const totalOriginalMb = (totalOriginalBytes / (1024 * 1024)).toFixed(2);
  const totalOptimizedMb = (totalOptimizedBytes / (1024 * 1024)).toFixed(2);
  const totalSavedPercent = (((totalOriginalBytes - totalOptimizedBytes) / totalOriginalBytes) * 100).toFixed(1);

  console.log(`\n======================================================`);
  console.log(`🎉 Resumen de Optimización:`);
  console.log(`   Imágenes procesadas: ${files.length} (${optimizedCount} reducidas)`);
  console.log(`   Tamaño original:     ${totalOriginalMb} MB`);
  console.log(`   Tamaño final:        ${totalOptimizedMb} MB`);
  console.log(`   Ahorro total:        ${savedMb} MB (-${totalSavedPercent}%)`);
  console.log(`======================================================\n`);
}

optimizeAll();
