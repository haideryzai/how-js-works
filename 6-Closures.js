// Goal: Understand closures — functions that remember the scope they were created in.

// ---- Example 1: A function remembering its outer variable ----
function makeCounter() {
  let count = 0; // Lives in makeCounter's scope

  return function increment() {
    count++; // Still reaches "count" after makeCounter has finished
    return count;
  };
}

const counterA = makeCounter();
console.log(counterA()); // Outputs: 1
console.log(counterA()); // Outputs: 2

const counterB = makeCounter(); // A brand-new scope, so a brand-new "count"
console.log(counterB()); // Outputs: 1

// What's happening:
// - Normally a function's variables vanish when it returns (see file 5).
// - But "increment" still references "count", so the engine keeps that scope alive.
// - Each call to makeCounter() creates its own separate scope, so counters don't interfere.

// ---- Example 2: Private data ----
function createWallet(initial) {
  let balance = initial; // No outside code can touch this directly

  return {
    deposit(amount) { balance += amount; },
    getBalance() { return balance; },
  };
}

const wallet = createWallet(100);
wallet.deposit(50);
console.log(wallet.getBalance()); // Outputs: 150
console.log(wallet.balance); // Outputs: undefined (it's truly hidden)

// ---- Example 3: The classic loop gotcha ----
const withVar = [];
for (var i = 0; i < 3; i++) {
  withVar.push(() => i); // All closures share ONE "i"
}
console.log(withVar.map((fn) => fn())); // Outputs: [3, 3, 3]

const withLet = [];
for (let j = 0; j < 3; j++) {
  withLet.push(() => j); // "let" makes a fresh "j" for every iteration
}
console.log(withLet.map((fn) => fn())); // Outputs: [0, 1, 2]

// Key takeaway:
// - A closure = a function + a reference to the variables around where it was defined.
// - It's how JavaScript gets private state, callbacks that remember context, and more.
