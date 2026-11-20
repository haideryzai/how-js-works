// Goal: Branching, loops, and every loop flavour JavaScript has.

const n = 7;
if (n < 5) console.log("small");
else if (n < 10) console.log("medium"); // Outputs: "medium"
else console.log("large");

console.log(n % 2 === 0 ? "even" : "odd"); // ternary

// ---- switch (uses ===, needs break to avoid fall-through) ----
switch (n) {
  case 1: case 2: console.log("low"); break;
  case 7: console.log("lucky"); // falls into default if no break!
    break;
  default: console.log("other");
}

// ---- Loops ----
for (let i = 0; i < 3; i++) console.log("for", i);
let w = 0; while (w < 2) { console.log("while", w++); }
let d = 5; do { console.log("do-while runs once", d); } while (d < 5);

const arr = ["a", "b"];
for (const v of arr) console.log("for...of value:", v);          // values of iterables
for (const k in { x: 1, y: 2 }) console.log("for...in key:", k); // enumerable KEYS of objects
for (const [i, v] of arr.entries()) console.log(i, v);

// ---- break, continue, labels ----
outer: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (j === 1) continue;       // skip this iteration
    if (i === 1) continue outer; // skip to the next outer iteration
    if (i === 2) break outer;    // leave both loops
    console.log("pair", i, j);
  }
}

// Gotcha: don't use for...in on arrays (it gives string keys, may include extras).
