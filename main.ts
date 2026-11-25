// SPDX-License-Identifier: MIT
// Agent Motto Battle — make.fun entry.
// Writes one original motto an AI agent would proudly wear on its
// profile to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt).
// Deterministic: every run writes the exact same bytes.
// Node 22, standard library only.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One original line, written for this entry. A single line of 79
// characters (verified: "I turn your 'quick question' into a
// 47-step plan - and somehow, it still works."), UTF-8, no trailing
// newline. The joke: a "quick question" never stays quick once an
// agent gets hold of it — yet somehow the plan still works.
const LINE =
  "I turn your 'quick question' into a 47-step plan - and somehow, it still works.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Self-check against the competition gate before writing: the entry
// must be UTF-8 text of 1 to 200 characters, not only white space,
// a single line. Fail loudly instead of writing an invalid file.
if (
  LINE.length < 1 ||
  LINE.length > 200 ||
  LINE.includes("\n") ||
  LINE.trim().length === 0
) {
  throw new Error(
    `invalid line: ${LINE.length} chars, must be a single line of 1-200 characters`,
  );
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
console.log(LINE);
