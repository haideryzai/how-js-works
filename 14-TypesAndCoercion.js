// Goal: Know JavaScript's types and how values get converted automatically.

// ---- The 8 types ----
// Primitives: string, number, bigint, boolean, undefined, null, symbol. Plus: object.
console.log(typeof "a", typeof 1, typeof 1n, typeof true, typeof undefined, typeof Symbol());
console.log(typeof null);       // Outputs: "object" (a famous historical bug)
console.log(typeof function(){}); // Outputs: "function"
console.log(Array.isArray([])); // Outputs: true (typeof [] is just "object")

// ---- Numbers ----
console.log(0.1 + 0.2);                 // Outputs: 0.30000000000000004 (binary floating point)
console.log(Math.abs(0.3 - (0.1 + 0.2)) < Number.EPSILON); // Outputs: true
console.log(Number.MAX_SAFE_INTEGER);   // Outputs: 9007199254740991
console.log(2n ** 64n);                  // BigInt handles huge integers exactly
console.log(NaN === NaN, Number.isNaN(NaN)); // Outputs: false true

// ---- Implicit coercion ----
console.log("5" + 1);   // Outputs: "51" (+ prefers strings)
console.log("5" - 1);   // Outputs: 4    (- forces numbers)
console.log([] + {});   // Outputs: "[object Object]"
console.log(+"42", +"", +"abc"); // Outputs: 42 0 NaN

// ---- Truthy / falsy ----
// Falsy: false, 0, -0, 0n, "", null, undefined, NaN. Everything else is truthy.
console.log([0, "", null, "0", [], {}].map(Boolean)); // [false,false,false,true,true,true]

// ---- Explicit conversion (prefer this) ----
console.log(Number("12px"), parseInt("12px"), String(12), Boolean("x")); // NaN 12 "12" true

// ---- Immutability of primitives ----
const s = "hello";
s[0] = "J";
console.log(s); // Outputs: "hello" (strings can't be changed in place)
