import { readFileSync, readdirSync, statSync } from "fs";
import { join } from "path";
import { gzipSync } from "zlib";

const dist = join(process.cwd(), "dist");
const files = readdirSync(dist).filter(
  (f) => f.endsWith(".js") || f.endsWith(".cjs")
);

console.log("\n📦 Bundle Size Report\n");

let totalRaw = 0;
let totalGzip = 0;

for (const file of files) {
  const path = join(dist, file);
  const raw = statSync(path).size;
  const content = readFileSync(path);
  const gzipped = gzipSync(content).length;
  totalRaw += raw;
  totalGzip += gzipped;
  console.log(
    `  ${file.padEnd(30)} ${(raw / 1024).toFixed(1).padStart(8)} KB raw | ${(gzipped / 1024).toFixed(1).padStart(6)} KB gzip`
  );
}

console.log(`  ${"─".repeat(60)}`);
console.log(
  `  ${"TOTAL".padEnd(30)} ${(totalRaw / 1024).toFixed(1).padStart(8)} KB raw | ${(totalGzip / 1024).toFixed(1).padStart(6)} KB gzip`
);
console.log();
