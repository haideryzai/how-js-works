// Goal: Work with objects: creating, copying, destructuring, freezing.

const key = "age";
const person = {
  name: "Ada",
  [key]: 36,                       // computed property name
  greet() { return `I'm ${this.name}`; }, // method shorthand
};
console.log(person.greet(), person["age"]);

// ---- Descriptors ----
Object.defineProperty(person, "id", { value: 1, enumerable: false, writable: false });
console.log(Object.keys(person), person.id); // id is hidden from keys

// ---- Keys, values, entries ----
console.log(Object.entries({ a: 1, b: 2 }));              // [ ['a',1], ['b',2] ]
console.log(Object.fromEntries([["a", 1], ["b", 2]]));    // { a: 1, b: 2 }

// ---- Destructuring ----
const { name, age: years, country = "unknown", ...rest } = { name: "Bo", age: 5, x: 1, y: 2 };
console.log(name, years, country, rest); // Bo 5 unknown { x: 1, y: 2 }
const [first, , third = 0, ...tail] = [1, 2, undefined, 4, 5];
console.log(first, third, tail); // 1 0 [4, 5]
let p = 1, q = 2; [p, q] = [q, p]; console.log(p, q); // swap: 2 1
const show = ({ id, tags: [t1] = [] }) => `${id}:${t1}`; // in parameters
console.log(show({ id: 9, tags: ["x"] })); // "9:x"

// ---- Spread and copying ----
const base = { a: 1, nested: { z: 1 } };
const shallow = { ...base, b: 2 };
shallow.nested.z = 99;
console.log(base.nested.z); // 99 — shallow copies share nested objects
const deep = structuredClone({ a: { b: 1 }, d: new Date(0) });
console.log(deep);

// ---- Freezing ----
const frozen = Object.freeze({ x: 1, inner: { y: 1 } });
frozen.x = 2; frozen.inner.y = 2; // x ignored (silently, or TypeError in strict mode); inner not frozen
console.log(frozen);
console.log(Object.isFrozen(frozen), Object.assign({}, { a: 1 }, { b: 2 }));

// ---- Getters / setters ----
const temp = { c: 25, get f() { return this.c * 9 / 5 + 32; }, set f(v) { this.c = (v - 32) * 5 / 9; } };
temp.f = 212; console.log(temp.c); // 100
