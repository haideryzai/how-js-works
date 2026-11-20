// Goal: Understand where values live and how the engine frees memory.
// Optional: run with `node --expose-gc 9-MemoryAndGarbageCollection.js` to see the effect.

// ---- Stack vs heap ----
let a = 5;
let b = a; // Primitives are copied by value
b = 10;
console.log(a, b); // Outputs: 5 10

const obj1 = { name: "Ada" };
const obj2 = obj1; // Objects are copied by REFERENCE (both point to one heap object)
obj2.name = "Grace";
console.log(obj1.name); // Outputs: "Grace"

// What's happening:
// - Primitives (numbers, booleans, ...) are small and held directly in the variable.
// - Objects, arrays and functions live on the heap; variables hold a pointer to them.

// ---- Garbage collection ----
// The engine uses "reachability": anything you can still get to from a root
// (globals, the current stack, closures) is kept; everything else is freed.
let big = { data: new Array(1_000_000).fill("x") };
big = null; // Nothing points at the old object anymore, so it is eligible for collection

// ---- Example: a leak through a closure ----
const cache = [];
function leaky() {
  const hugeData = new Array(1_000_000).fill("y");
  cache.push(() => hugeData.length); // The closure keeps hugeData reachable forever
}
leaky();
console.log(cache.length); // Outputs: 1 (and ~8MB stays alive)

// ---- Observing it (Node only) ----
if (typeof global !== "undefined" && typeof global.gc === "function") {
  const before = process.memoryUsage().heapUsed;
  global.gc();
  const after = process.memoryUsage().heapUsed;
  console.log(`heap before gc: ${before}, after gc: ${after}`);
}

// Key takeaway:
// - You don't free memory manually; you just stop referencing things.
// - Leaks in JS are usually "still reachable" objects: globals, caches, listeners, closures.
