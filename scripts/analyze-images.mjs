import sharp from "sharp";
import { readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const IMAGE_EXTS = new Set([".webp", ".png", ".jpg", ".jpeg", ".avif", ".gif"]);

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

async function analyze() {
  const files = getFiles("public");
  let totalBytes = 0;
  const results = [];

  for (const file of files) {
    const size = statSync(file).size;
    totalBytes += size;
    try {
      const meta = await sharp(file).metadata();
      results.push({
        file: file.replace(/^public[\\/]/, ""),
        sizeKb: (size / 1024).toFixed(1),
        bytes: size,
        width: meta.width,
        height: meta.height,
        format: meta.format,
        hasAlpha: meta.hasAlpha,
      });
    } catch (e) {
      results.push({
        file: file.replace(/^public[\\/]/, ""),
        sizeKb: (size / 1024).toFixed(1),
        bytes: size,
        error: e.message,
      });
    }
  }

  results.sort((a, b) => b.bytes - a.bytes);
  console.log(`Total imágenes: ${results.length}, Tamaño total: ${(totalBytes / (1024 * 1024)).toFixed(2)} MB\n`);
  console.log("Top 25 más pesadas:");
  for (const r of results.slice(0, 25)) {
    console.log(`- ${r.sizeKb.padStart(6)} KB | ${r.width}x${r.height} | ${r.format} | ${r.file}`);
  }
}

analyze();
