// Goal: Proxy, Reflect, getters, and other powerful features.

// ---- Proxy: intercept operations on an object ----
const target = { a: 1 };
const logged = new Proxy(target, {
  get(t, prop, receiver) { console.log("get", String(prop)); return Reflect.get(t, prop, receiver); },
  set(t, prop, value) {
    if (typeof value !== "number") throw new TypeError("numbers only");
    return Reflect.set(t, prop, value);
  },
  has: (t, p) => p.startsWith("a"),
});
logged.a; logged.b = 2;
try { logged.c = "x"; } catch (e) { console.log(e.message); }
console.log("anything" in logged, "zzz" in logged); // true false

// ---- Default values via Proxy ----
const withDefault = new Proxy({}, { get: (t, k) => (k in t ? t[k] : 0) });
withDefault.hits++; console.log(withDefault.hits); // 1

// ---- Reflect mirrors the low-level operations ----
console.log(Reflect.ownKeys({ a: 1, [Symbol("s")]: 2 }), Reflect.has({ x: 1 }, "x"));

// ---- Closures + WeakMap for truly private state (pre-# fields pattern) ----
const priv = new WeakMap();
class Secret { constructor(v) { priv.set(this, v); } reveal() { return priv.get(this); } }
console.log(new Secret(7).reveal());

// ---- Dates, JSON, Math, Intl ----
console.log(JSON.stringify({ a: [1, { b: 2 }], d: new Date(0), u: undefined, f() {} }));
console.log(JSON.parse('{"n":1}', (k, v) => (typeof v === "number" ? v * 2 : v)));
console.log(new Date(Date.UTC(2026, 10, 20)).toISOString()); // months are 0-indexed!
console.log(Math.round(2.5), Math.round(-2.5), Math.hypot(3, 4), Math.clz32(1));
console.log(new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(1234.5));
console.log(new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeZone: "UTC" }).format(new Date(0)));

// ---- eval, with, label, comma, void exist but avoid them ----
// ---- Strict mode: "use strict" at top of file/function turns silent mistakes into errors ----
(function () { "use strict"; try { undeclared = 1; } catch (e) { console.log(e.name); } })(); // ReferenceError

// ---- Getters on classes, Symbol.asyncIterator, structuredClone, globalThis ----
console.log(typeof globalThis, structuredClone(new Map([[1, 2]])));

// ---- Timers & microtask helpers ----
queueMicrotask(() => console.log("microtask"));
setImmediate?.(() => console.log("setImmediate (Node)"));
