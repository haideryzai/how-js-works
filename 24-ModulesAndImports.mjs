// Goal: ES modules (.mjs, or "type": "module" in package.json).
// Run with: node 24-ModulesAndImports.mjs

// ---- Static imports are hoisted and analysed before the code runs ----
import { basename } from "node:path";
import * as os from "node:os";

console.log(basename("/a/b/file.txt"), typeof os.platform);

// ---- Exports (shown for reference; this file has none) ----
//   export const x = 1;            // named export
//   export default function () {}  // one default export per module
//   export { a as b };             // rename
//   export * from "./other.mjs";   // re-export
//   import def, { x as y } from "./m.mjs";

// ---- Dynamic import: loads on demand, returns a promise ----
const { default: fs } = await import("node:fs"); // top-level await works in modules
console.log(typeof fs.readFileSync);

// ---- Module facts ----
console.log(import.meta.url.startsWith("file://")); // where this module lives
console.log(typeof module, typeof require);         // "undefined" "undefined" in ESM

// ---- CommonJS (older Node style) for comparison ----
//   const fs = require("fs");        // synchronous, runs when reached
//   module.exports = { thing };
//
// Differences: ESM is static (tree-shakeable), async-loaded, always strict mode,
// has live bindings (importers see updates), and each module is evaluated once.
