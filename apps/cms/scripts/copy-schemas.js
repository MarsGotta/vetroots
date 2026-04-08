/**
 * Copy non-TS files (schema.json, etc.) from src/ to dist/src/
 *
 * Strapi v5's TypeScript compilation only emits .js files from .ts sources.
 * Content type schema.json files need to be manually copied to the dist directory
 * so Strapi can discover them at runtime.
 */
const fs = require("fs");
const path = require("path");

const srcDir = path.resolve(__dirname, "..", "src");
const distDir = path.resolve(__dirname, "..", "dist", "src");

function copyNonTsFiles(src, dest) {
  if (!fs.existsSync(src)) return;

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyNonTsFiles(srcPath, destPath);
    } else if (!entry.name.endsWith(".ts") && !entry.name.endsWith(".map")) {
      fs.mkdirSync(path.dirname(destPath), { recursive: true });
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyNonTsFiles(srcDir, distDir);
console.log("Copied schema files to dist/");
