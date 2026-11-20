// Goal: Understand "this" — it depends on HOW a function is called, not where it's written.

const user = {
  name: "Ada",
  regular() { return this && this.name; },
  arrow: () => typeof this,       // Arrows take "this" from the surrounding scope
};

console.log(user.regular()); // Outputs: "Ada" (called as a method: this = user)

const detached = user.regular;
console.log(detached()); // Outputs: undefined (plain call: this is undefined/global, not user)

// ---- Fixing it: call, apply, bind ----
function intro(greeting, punct) { return `${greeting}, ${this.name}${punct}`; }
console.log(intro.call({ name: "Bob" }, "Hi", "!"));     // Outputs: "Hi, Bob!"
console.log(intro.apply({ name: "Cy" }, ["Yo", "?"]));   // Outputs: "Yo, Cy?"
const bound = intro.bind({ name: "Di" }, "Hey");
console.log(bound("."));                                  // Outputs: "Hey, Di."

// ---- Arrow functions inside methods keep the outer "this" ----
const timer = {
  label: "tick",
  start() { return [1, 2].map((n) => `${this.label}${n}`); }, // arrow uses start's "this"
};
console.log(timer.start()); // Outputs: [ 'tick1', 'tick2' ]

// ---- "new" binds this to a fresh object ----
function Point(x, y) { this.x = x; this.y = y; }
console.log(new Point(1, 2)); // Outputs: Point { x: 1, y: 2 }

// Rules, in priority order:
// 1. new  2. call/apply/bind  3. obj.method()  4. plain call (undefined in strict mode)
// Arrows ignore all of these and use their enclosing "this".
