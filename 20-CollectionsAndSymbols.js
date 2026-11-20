// Goal: Map, Set, WeakMap, WeakSet, Symbol — the built-in collections.

// ---- Map: any value as key, keeps insertion order ----
const m = new Map([["a", 1]]);
const objKey = {};
m.set(objKey, "object key works").set(NaN, "NaN works");
console.log(m.get(objKey), m.get(NaN), m.size, [...m.keys()].length);
for (const [k, v] of m) { /* iterate entries */ }

// ---- Set: unique values ----
const s = new Set([1, 2, 2, 3]);
console.log(s, s.has(2), [...new Set("hello")].join("")); // dedupe: "helo"
const A = new Set([1, 2, 3]), B = new Set([2, 3, 4]);
console.log(A.intersection(B), A.union(B), A.difference(B)); // Set algebra (Node 22+)

// ---- WeakMap / WeakSet: keys are held weakly, so they can be garbage collected ----
const meta = new WeakMap();
let el = { id: 1 };
meta.set(el, { clicks: 0 }); // metadata that vanishes when el does
el = null;                   // entry is now collectable (no leak). Not iterable, no size.

// ---- WeakRef (rarely needed) ----
const ref = new WeakRef({ big: true });
console.log(typeof ref.deref());

// ---- Symbol: unique keys, and hooks into the language ----
const id = Symbol("id");
const o = { [id]: 1, visible: true };
console.log(Object.keys(o), o[id]);   // symbol keys skip normal enumeration
console.log(Symbol("x") === Symbol("x"), Symbol.for("x") === Symbol.for("x")); // false true

// Well-known symbols customise behaviour
const money = {
  amount: 5,
  [Symbol.toPrimitive](hint) { return hint === "string" ? "$5" : 5; },
};
console.log(`${money}`, money + 1); // "$5" 6
console.log(Object.prototype.toString.call(null)); // "[object Null]"

// Key takeaway: use Map/Set instead of plain objects when keys are dynamic or non-strings.
