# How JavaScript Works

A collection of simple, practical code examples with detailed comments to demystify how JavaScript works behind the scenes. From how the engine runs your code (interpreters, compilers, and JIT) to the core language features, each script breaks complex ideas into bite-sized pieces. Aimed at beginners and curious developers who want to understand the "why" and "how".

## How to use

Every file is runnable and prints its results. Read the comments, run the file, then change things and run it again.

```bash
node 6-Closures.js
```

Requires a recent Node.js (22+ recommended; a few examples use newer APIs such as `Set` algebra and iterator helpers). File 1 uses `alert` and file 26 uses the DOM, so those two are meant for a browser.

## Contents

### Part 1 — The engine
| # | File | Topic |
|---|------|-------|
| 1 | `1-BasicJavaScriptExecution.js` | Interpreting a script |
| 2 | `2-LoopThatMightGetCompiled.js` | Warm code and baseline compilation |
| 3 | `3-DynamicTypesAndDeoptimization.js` | Dynamic types and deoptimization |
| 4 | `4-HotLoopWithOptimization.js` | Hot loops and optimizing compilers |
| 7 | `7-CallStackAndExecutionContext.js` | Call stack, execution contexts, stack overflow |
| 8 | `8-EventLoop.js` | Event loop, microtasks vs macrotasks |
| 9 | `9-MemoryAndGarbageCollection.js` | Stack vs heap, garbage collection, leaks |

### Part 2 — Core language
| # | File | Topic |
|---|------|-------|
| 5 | `5-VariablesAndScopes.js` | `var`/`let`/`const`, scope, hoisting |
| 6 | `6-Closures.js` | Closures and private state |
| 10 | `10-FunctionsInDepth.js` | Function forms, params, higher-order functions, currying |
| 11 | `11-ThisKeyword.js` | `this`, `call`/`apply`/`bind`, arrows |
| 12 | `12-PrototypesAndInheritance.js` | Prototype chain |
| 13 | `13-Classes.js` | Classes, private fields, mixins |
| 14 | `14-TypesAndCoercion.js` | Types, numbers, coercion, truthiness |
| 15 | `15-OperatorsAndEquality.js` | `==` vs `===`, `??`, `?.`, bitwise |
| 16 | `16-ControlFlow.js` | Conditionals, every loop type, labels |

### Part 3 — Data and built-ins
| # | File | Topic |
|---|------|-------|
| 17 | `17-ObjectsAndDestructuring.js` | Objects, destructuring, spread, freezing |
| 18 | `18-ArraysAndIteration.js` | Array methods, sorting, typed arrays |
| 19 | `19-StringsAndRegex.js` | Strings, Unicode, template literals, regex |
| 20 | `20-CollectionsAndSymbols.js` | Map, Set, WeakMap, Symbol |

### Part 4 — Advanced and asynchronous
| # | File | Topic |
|---|------|-------|
| 21 | `21-IteratorsAndGenerators.js` | Iteration protocol, generators |
| 22 | `22-PromisesAndAsync.js` | Promises, async/await, combinators, abort |
| 23 | `23-ErrorHandling.js` | try/catch, custom errors, causes |
| 24 | `24-ModulesAndImports.mjs` | ES modules vs CommonJS |
| 25 | `25-ModernSyntaxAndMetaprogramming.js` | Proxy, Reflect, JSON, Date, Intl, strict mode |
| 26 | `26-BrowserAndDOM.js` | DOM, events, Web APIs, workers |

## Where to go next
Specs and references: [MDN Web Docs](https://developer.mozilla.org/docs/Web/JavaScript), [ECMAScript spec](https://tc39.es/ecma262/), and [V8 blog](https://v8.dev/blog) for engine internals.
