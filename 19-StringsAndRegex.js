// Goal: Strings, template literals and regular expressions.

const name = "World";
console.log(`Hello, ${name}! 2+2=${2 + 2}`); // template literal
console.log(`line1
line2`); // multi-line

// ---- Useful methods (all return NEW strings) ----
const s = "  JavaScript Rocks  ";
console.log(s.trim().toUpperCase(), s.includes("Script"), s.trim().startsWith("Java"));
console.log("a-b-c".split("-"), "ab".repeat(3), "7".padStart(3, "0"));
console.log("abc".at(-1), "abcdef".slice(2, 4), "a-b".replaceAll("-", "+"));

// ---- Unicode ----
console.log("😀".length, [..."😀"].length); // 2 1 (UTF-16 code units vs characters)
console.log("é".normalize("NFD").length);   // 2 (base letter + accent)

// ---- Tagged templates ----
const tag = (strings, ...vals) => strings.raw.join("|") + " <- " + vals.join(",");
console.log(tag`a${1}b${2}c`);

// ---- Regex ----
const re = /(\d{4})-(\d{2})-(\d{2})/;
console.log("Date: 2026-11-20".match(re).slice(1)); // ['2026','11','20']
const named = /(?<year>\d{4})-(?<month>\d{2})/.exec("2026-11");
console.log(named.groups.year, named.groups.month);
console.log("a1b22c333".match(/\d+/g));                        // ['1','22','333']
console.log([..."a1b22".matchAll(/[a-z](\d+)/g)].map((m) => m[1])); // ['1','22']
console.log("John Smith".replace(/(\w+) (\w+)/, "$2, $1"));    // 'Smith, John'
console.log(/^[\w.]+@[\w.]+\.\w+$/.test("me@site.com"));       // true

// Gotcha: a regex with the g flag keeps lastIndex state between .test() calls.
const g = /a/g;
console.log(g.test("a"), g.test("a")); // true false
