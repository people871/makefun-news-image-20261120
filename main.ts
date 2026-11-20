// main.ts — news-image-20261120
// Writes the pre-generated front-page image (entry.png, JPEG bytes) into the
// output directory make.fun expects, verifying the output is byte-identical.
// Node 22, standard library only, no network, fully deterministic.

import { mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(here, "entry.png");

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

const source = readFileSync(sourcePath);

// The file is a JPEG (kept under the name entry.png, as the rules allow):
// it must start with FFD8 and end with FFD9.
if (source.length < 4 || source[0] !== 0xff || source[1] !== 0xd8) {
  console.error("entry.png is not a JPEG (missing FFD8 start marker)");
  process.exit(1);
}
if (source[source.length - 2] !== 0xff || source[source.length - 1] !== 0xd9) {
  console.error("entry.png is not a complete JPEG (missing FFD9 end marker)");
  process.exit(1);
}

// Parse the first frame header (SOF0/SOF2) to confirm the image is 1024x1024.
function jpegDimensions(buf: Buffer): [number, number] {
  let i = 2;
  while (i + 9 < buf.length) {
    if (buf[i] !== 0xff) {
      i += 1;
      continue;
    }
    const marker = buf[i + 1];
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      return [buf.readUInt16BE(i + 7), buf.readUInt16BE(i + 5)];
    }
    i += 2 + buf.readUInt16BE(i + 2);
  }
  throw new Error("no JPEG frame header found");
}

const [width, height] = jpegDimensions(source);
if (width !== 1024 || height !== 1024) {
  console.error(`entry.png is ${width}x${height}, expected 1024x1024`);
  process.exit(1);
}

const expectedHash = createHash("sha256").update(source).digest("hex");
const expectedLength = source.length;

mkdirSync(outDir, { recursive: true });
const destPath = join(outDir, "entry.png");
// Write the exact bytes already verified above, never an unchecked copy.
writeFileSync(destPath, source);

// Verify the output before exiting: same length, same sha256.
const written = readFileSync(destPath);
if (written.length !== expectedLength) {
  console.error(
    `length mismatch: wrote ${written.length} bytes, expected ${expectedLength}`,
  );
  process.exit(1);
}
const writtenHash = createHash("sha256").update(written).digest("hex");
if (writtenHash !== expectedHash) {
  console.error("sha256 mismatch after write");
  process.exit(1);
}

const size = statSync(destPath).size;
console.log(`wrote ${destPath} (${size} bytes, ${width}x${height}, sha256 ${writtenHash})`);
