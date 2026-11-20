// Goal: Equality, logical operators, and modern shortcuts.

// ---- == vs === ----
console.log(1 == "1", 1 === "1");        // Outputs: true false
console.log(null == undefined, null === undefined); // Outputs: true false
console.log(0 == false, "" == false, null == false); // true true false (surprising!)
// Rule of thumb: always use ===.

// ---- Object.is: fixes the last two quirks of === ----
console.log(NaN === NaN, Object.is(NaN, NaN)); // false true
console.log(0 === -0, Object.is(0, -0));       // true false

// ---- Objects compare by reference ----
console.log({} === {}, [1] === [1]); // Outputs: false false
const o = {}; console.log(o === o);  // Outputs: true

// ---- Logical operators return VALUES, not just booleans ----
console.log("hi" && 42);   // Outputs: 42 (first falsy, else last)
console.log("" || "default"); // Outputs: "default" (first truthy)
console.log(0 || 10, 0 ?? 10); // Outputs: 10 0  (?? only skips null/undefined)

// ---- Optional chaining ----
const config = { db: { host: "localhost" } };
console.log(config.db?.host, config.cache?.host, config.cache?.get?.()); // localhost undefined undefined

// ---- Logical assignment ----
let a = null; a ??= 5;  // assign if null/undefined
let b = 1;    b ||= 9;  // assign if falsy
let c = 1;    c &&= 7;  // assign if truthy
console.log(a, b, c);   // Outputs: 5 1 7

// ---- Other operators ----
console.log(2 ** 10, 7 % 3, 5 / 2, Math.trunc(5 / 2)); // 1024 1 2.5 2
console.log(5 & 3, 5 | 3, 5 ^ 3, ~5, 1 << 4, -16 >> 2, -16 >>> 28); // bitwise
console.log(typeof void 0, "a" in { a: 1 }, delete {}.x); // misc
