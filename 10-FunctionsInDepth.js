// Goal: Learn the different ways to write functions and what makes them special.

// ---- Declarations vs expressions vs arrows ----
function declared(a, b) { return a + b; }          // Hoisted: callable before this line
const expression = function (a, b) { return a + b; }; // Not hoisted (const is in the TDZ)
const arrow = (a, b) => a + b;                      // Short syntax, no own "this"/"arguments"
console.log(declared(1, 2), expression(1, 2), arrow(1, 2)); // Outputs: 3 3 3

// ---- Parameters: defaults, rest, spread ----
function greet(name = "stranger", ...others) {
  return `Hi ${name} (+${others.length} more)`;
}
console.log(greet());                    // Outputs: "Hi stranger (+0 more)"
console.log(greet("Ada", "Bob", "Cy"));  // Outputs: "Hi Ada (+2 more)"
console.log(Math.max(...[3, 9, 4]));     // Outputs: 9 (spread turns an array into arguments)

// ---- Functions are values (first-class) ----
function applyTwice(fn, x) { return fn(fn(x)); }
console.log(applyTwice((n) => n * 2, 5)); // Outputs: 20

// ---- Higher-order functions, currying, composition ----
const curry = (f) => (a) => (b) => f(a, b);
console.log(curry((a, b) => a * b)(3)(4)); // Outputs: 12
const compose = (...fns) => (x) => fns.reduceRight((acc, f) => f(acc), x);
console.log(compose((x) => x + 1, (x) => x * 2)(5)); // Outputs: 11

// ---- IIFE: run immediately, keep variables private ----
(function () { const secret = 42; console.log("IIFE ran", secret); })();

// ---- Recursion ----
const factorial = (n) => (n <= 1 ? 1 : n * factorial(n - 1));
console.log(factorial(5)); // Outputs: 120

// ---- Pure vs impure ----
const pureAdd = (a, b) => a + b;          // Same input -> same output, no side effects
let total = 0;
const impureAdd = (n) => (total += n);    // Changes outside state

// Key takeaway:
// - Functions are objects you can pass, return and store. Most JS patterns build on that.
