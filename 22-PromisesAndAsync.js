// Goal: Promises, async/await and the combinators.
// Run with: node 22-PromisesAndAsync.js

const wait = (ms, value, fail = false) =>
  new Promise((resolve, reject) => setTimeout(() => (fail ? reject(new Error(value)) : resolve(value)), ms));

async function main() {
  // ---- States: pending -> fulfilled | rejected (settled once, forever) ----
  console.log(await wait(10, "resolved"));

  // ---- Chaining: each .then returns a new promise ----
  const chained = await Promise.resolve(1).then((n) => n + 1).then((n) => n * 10);
  console.log(chained); // 20

  // ---- Error handling ----
  try { await wait(10, "boom", true); }
  catch (e) { console.log("caught:", e.message); }
  finally { console.log("finally always runs"); }

  // ---- Sequential vs parallel ----
  let t = Date.now();
  await wait(50, "a"); await wait(50, "b");
  console.log("sequential ~100ms:", Date.now() - t >= 95);
  t = Date.now();
  await Promise.all([wait(50, "a"), wait(50, "b")]);
  console.log("parallel ~50ms:", Date.now() - t < 90);

  // ---- Combinators ----
  console.log(await Promise.all([1, wait(5, 2)]));                 // [1, 2] (rejects if ANY rejects)
  console.log(await Promise.allSettled([wait(5, "ok"), wait(5, "no", true)])); // never rejects
  console.log(await Promise.race([wait(30, "slow"), wait(5, "fast")]));        // "fast"
  console.log(await Promise.any([wait(5, "x", true), wait(10, "y")]));         // "y" (first success)

  // ---- Timeouts with AbortController ----
  const ac = new AbortController();
  setTimeout(() => ac.abort(), 5);
  try { await new Promise((res, rej) => ac.signal.addEventListener("abort", () => rej(ac.signal.reason))); }
  catch (e) { console.log("aborted:", e.name); }

  // ---- Async iteration ----
  async function* ticks() { for (let i = 0; i < 3; i++) { await wait(5); yield i; } }
  for await (const x of ticks()) console.log("tick", x);

  // ---- Promise.withResolvers ----
  const { promise, resolve } = Promise.withResolvers();
  setTimeout(() => resolve("manual"), 5);
  console.log(await promise);
}

main();

// Gotchas:
// - forEach(async ...) does NOT wait; use for...of or Promise.all(map(...)).
// - An unhandled rejection crashes modern Node. Always await or .catch.
// - "await" only pauses the async function; everything else keeps running.
