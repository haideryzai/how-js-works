// Goal: Throwing, catching, custom errors, and error causes.

// ---- try / catch / finally ----
function parse(json) {
  try { return JSON.parse(json); }
  catch (err) { console.log(err.name, "-", err.message.slice(0, 30)); return null; }
  finally { console.log("cleanup runs even after return"); }
}
parse("{bad");

// ---- Built-in error types ----
for (const f of [() => null.x, () => undefinedVar, () => new Array(-1), () => decodeURIComponent("%")]) {
  try { f(); } catch (e) { console.log(e.constructor.name); } // TypeError ReferenceError RangeError URIError
}

// ---- Custom errors ----
class ValidationError extends Error {
  constructor(field, options) {
    super(`Invalid ${field}`, options);
    this.name = "ValidationError";
    this.field = field;
  }
}
try {
  try { throw new TypeError("low-level"); }
  catch (cause) { throw new ValidationError("email", { cause }); } // wrap, keep the original
} catch (e) {
  console.log(e instanceof ValidationError, e.field, e.cause.message);
}

// ---- You can throw anything, but throw Errors (they carry a stack) ----
try { throw "a string"; } catch (e) { console.log(typeof e); }

// ---- Aggregate errors ----
Promise.any([Promise.reject(1), Promise.reject(2)]).catch((e) => console.log(e.constructor.name, e.errors));

// ---- Optional catch binding ----
try { JSON.parse("x"); } catch { console.log("don't need the error object"); }

// Key takeaway: catch what you can handle, rethrow the rest, and never swallow errors silently.
