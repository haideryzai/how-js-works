// Goal: The iteration protocol and generator functions.

// ---- Anything with [Symbol.iterator] works with for...of, spread, destructuring ----
const range = {
  from: 1, to: 4,
  [Symbol.iterator]() {
    let n = this.from; const end = this.to;
    return { next: () => (n <= end ? { value: n++, done: false } : { value: undefined, done: true }) };
  },
};
console.log([...range]); // [1, 2, 3, 4]

// ---- Generators: functions that can pause with yield ----
function* counter() {
  const got = yield 1;      // pause; value sent in by next(x) becomes "got"
  console.log("received", got);
  yield 2;
  return "end";             // return value shows up with done: true
}
const g = counter();
console.log(g.next());      // { value: 1, done: false }
console.log(g.next("hi"));  // logs "received hi" then { value: 2, done: false }
console.log(g.next());      // { value: 'end', done: true }

// ---- Lazy infinite sequences ----
function* naturals() { let n = 0; while (true) yield n++; }
function* take(it, k) { let i = 0; for (const v of it) { if (i++ >= k) return; yield v; } }
console.log([...take(naturals(), 5)]); // [0, 1, 2, 3, 4]

// ---- yield* delegates to another iterable ----
function* both() { yield* [1, 2]; yield* "ab"; }
console.log([...both()]); // [1, 2, 'a', 'b']

// ---- Iterator helpers (Node 22+) ----
console.log(naturals().filter((n) => n % 2).map((n) => n * n).take(3).toArray()); // [1, 9, 25]

// Key takeaway: generators give you lazy, pausable computation; async generators (file 23) do the same for async data.
