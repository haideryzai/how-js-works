// Goal: See how the engine tracks "where we are" using the call stack.

function third() {
  console.log("third: top of the stack");
  console.log(new Error("stack snapshot").stack.split("\n").slice(1, 4).join("\n"));
}

function second() {
  console.log("second: calling third");
  third();
  console.log("second: back after third");
}

function first() {
  console.log("first: calling second");
  second();
  console.log("first: back after second");
}

first();

// What's happening:
// 1. The engine starts with the global execution context at the bottom of the stack.
// 2. Calling first() pushes a new context on top. Calling second() pushes another, etc.
// 3. When a function returns, its context is popped and we resume in the one below.
// 4. The stack trace printed in third() is exactly this list of contexts.
//    Output order shows "last in, first out".

// ---- Example 2: Stack overflow ----
function recurseForever(depth) {
  return recurseForever(depth + 1); // Never stops, so contexts keep piling up
}

try {
  recurseForever(0);
} catch (err) {
  console.log(err instanceof RangeError); // Outputs: true
  console.log(err.message); // Outputs: "Maximum call stack size exceeded"
}

// What's happening:
// - The stack has a limited size. Infinite recursion fills it up and the engine throws.
// - Every recursive function needs a base case that stops it.

// Key takeaway:
// - JavaScript has ONE call stack, so it runs one thing at a time.
// - That single-threaded design is why the event loop (next file) exists.
