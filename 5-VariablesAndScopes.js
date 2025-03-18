// Goal: Understand how JavaScript handles variables, their scope, and why it matters.

// ---- Example 1: Global Scope ----
let globalVar = "I'm global!"; // Declared outside any function, accessible everywhere

function sayHello() {
  console.log(globalVar); // Can access globalVar because it’s in the global scope
}

sayHello(); // Outputs: "I'm global!"
console.log(globalVar); // Outputs: "I'm global!" (works outside the function too)

// What’s happening:
// - Variables declared outside functions are in the "global scope."
// - The JavaScript engine stores them in a global object (like "window" in browsers).
// - Any part of the code can access or change them—be careful with globals!

// ---- Example 2: Function Scope with "var" ----
function countApples() {
  var apples = 5; // "var" creates a variable scoped to this function
  console.log("Inside function:", apples); // Works here
}

countApples(); // Outputs: "Inside function: 5"
// console.log(apples); // Error! "apples is not defined" because it’s trapped in the function

// What’s happening:
// - "var" variables are "function-scoped"—they only exist inside the function they’re declared in.
// - The engine creates a new "execution context" for the function, and "apples" lives there.
// - Once the function finishes, "apples" is gone (unless something weird like a closure happens—more on that later).

// ---- Example 3: Block Scope with "let" and "const" ----
if (true) {
  var oldWay = "I’m var"; // "var" ignores blocks like "if"
  let newWay = "I’m let"; // "let" respects blocks
  const fixedWay = "I’m const"; // "const" also respects blocks, can’t be reassigned
  console.log(newWay); // Outputs: "I’m let"
}

console.log(oldWay); // Outputs: "I’m var" (var escapes the block!)
// console.log(newWay); // Error! "newWay is not defined" (let stays in the block)
// console.log(fixedWay); // Error! "fixedWay is not defined" (const stays in the block too)

// What’s happening:
// - "var" is old-school and ignores block boundaries (like "if" or "for" braces).
// - "let" and "const" are modern—they’re "block-scoped," meaning they only live inside the curly braces {}.
// - The engine tracks these scopes in a "scope chain" to know where variables are available.

// ---- Example 4: Scope Chain and Nested Functions ----
let outerVar = "I’m outside";

function outerFunction() {
  let innerVar = "I’m inside";

  function innerFunction() {
    console.log(outerVar); // Outputs: "I’m outside" (looks up the scope chain)
    console.log(innerVar); // Outputs: "I’m inside" (found in outerFunction’s scope)
  }

  innerFunction();
}

outerFunction();
// console.log(innerVar); // Error! "innerVar is not defined" (can’t reach inner scope)

// What’s happening:
// - JavaScript uses a "scope chain" to find variables.
// - Inner functions can look up to outer scopes (like outerFunction or global), but not the other way around.
// - The engine builds this chain when it parses your code, so it knows where to look.

// ---- Example 5: Hoisting with "var" ----
console.log(hoistedVar); // Outputs: "undefined" (not an error!)
var hoistedVar = "I’m hoisted";

// What’s happening:
// - "var" declarations are "hoisted" to the top of their scope by the engine.
// - It’s like the engine rewrites this as:
//   var hoistedVar; // Declaration moves up
//   console.log(hoistedVar); // undefined because value isn’t set yet
//   hoistedVar = "I’m hoisted"; // Assignment stays where it is
// - "let" and "const" don’t hoist this way—they’d throw an error if used before declaration.

// ---- Bonus: Why This Matters ----
function trickyScope() {
  var x = 10;
  if (true) {
    var x = 20; // Overwrites the outer x (var doesn’t care about blocks!)
    console.log("Inside if:", x); // Outputs: 20
  }
  console.log("Outside if:", x); // Outputs: 20 (not 10!)
}

trickyScope();

// Try it with "let" instead:
// function betterScope() {
//   let x = 10;
//   if (true) {
//     let x = 20; // Separate variable, doesn’t touch the outer x
//     console.log("Inside if:", x); // Outputs: 20
//   }
//   console.log("Outside if:", x); // Outputs: 10
// }
// betterScope();

// Key takeaway:
// - Understanding scope helps you avoid bugs and write cleaner code.
// - The JavaScript engine manages all this behind the scenes!