// Goal: Understand how JavaScript does async work while being single-threaded.
// Run with: node 8-EventLoop.js

console.log("1. synchronous start");

setTimeout(() => {
  console.log("5. setTimeout callback (macrotask)");
}, 0);

Promise.resolve().then(() => {
  console.log("3. promise callback (microtask)");
});

queueMicrotask(() => {
  console.log("4. queueMicrotask callback (microtask)");
});

console.log("2. synchronous end");

// Expected output order: 1, 2, 3, 4, 5
//
// What's happening:
// 1. All synchronous code runs first, straight on the call stack (lines 1 and 2).
// 2. When the stack is empty, the engine drains the MICROTASK queue
//    (promise callbacks, queueMicrotask) completely.
// 3. Only then does the event loop pick ONE task from the MACROTASK queue
//    (setTimeout, I/O, UI events), run it, and drain microtasks again.
// 4. setTimeout(fn, 0) does NOT mean "right now". It means "after the current
//    code and all microtasks are done".

// ---- Example 2: Blocking the loop ----
const start = Date.now();
setTimeout(() => {
  console.log(`timer wanted 10ms, fired after ~${Date.now() - start}ms`);
}, 10);

while (Date.now() - start < 100) {
  // Busy-wait: the call stack is never empty, so the timer can't run
}

// What's happening:
// - The timer expired after 10ms but its callback had to wait for the stack to clear.
// - Long synchronous work freezes everything else — in a browser, even the UI.

// Key takeaway:
// - Sync code -> microtasks -> next macrotask. Keep sync work short.
