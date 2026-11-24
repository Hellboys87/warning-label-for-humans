import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

// One original warning-label line for humans, kept inside 160 characters.
const LABEL =
  "WARNING: Human may forget why it walked into this room, then defend the trip with total confidence — keep snacks nearby and expectations underground.";

function main(): void {
  // The gate only accepts UTF-8 text of 1 to 160 characters, so fail loudly
  // here rather than shipping a label the judge would never even read.
  const chars = [...LABEL].length;
  if (chars < 1 || chars > 160 || LABEL.trim().length === 0) {
    throw new Error(`warning label must be 1-160 characters, got ${chars}`);
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), LABEL + "\n", "utf8");
}

main();
