// Goal: Master arrays and the functional iteration methods.

const nums = [5, 1, 4, 2, 3];

// ---- Transform ----
console.log(nums.map((n) => n * 2));            // [10, 2, 8, 4, 6]
console.log(nums.filter((n) => n % 2));         // [5, 1, 3]
console.log(nums.reduce((sum, n) => sum + n, 0)); // 15
console.log([[1, 2], [3, [4]]].flat(Infinity)); // [1, 2, 3, 4]
console.log([1, 2].flatMap((n) => [n, n * 10])); // [1, 10, 2, 20]

// ---- Search ----
console.log(nums.find((n) => n > 3), nums.findIndex((n) => n > 3)); // 5 0
console.log(nums.findLast((n) => n < 3));        // 2
console.log(nums.includes(4), nums.indexOf(9)); // true -1
console.log(nums.some((n) => n > 4), nums.every((n) => n > 0)); // true true
console.log(nums.at(-1));                        // 3 (negative index from the end)

// ---- Sorting: default sort is LEXICOGRAPHIC ----
console.log([10, 9, 1].sort());                  // [1, 10, 9] — surprise!
console.log([10, 9, 1].sort((a, b) => a - b));   // [1, 9, 10]

// ---- Mutating vs non-mutating ----
const copy = [...nums];
copy.push(6); copy.pop(); copy.unshift(0); copy.shift(); copy.splice(1, 2, "x"); // all mutate
console.log(copy);
console.log(nums.toSorted((a, b) => a - b), nums.toReversed(), nums.with(0, 99)); // return new arrays
console.log(nums.slice(1, 3), nums.concat([7]), nums.join("-"));

// ---- Creating arrays ----
console.log(Array.from({ length: 3 }, (_, i) => i * i)); // [0, 1, 4]
console.log(Array.of(7), new Array(3).fill(0), [..."abc"]);

// ---- Grouping ----
console.log(Object.groupBy(nums, (n) => (n % 2 ? "odd" : "even")));

// ---- Typed arrays (raw binary data) ----
const bytes = new Uint8Array([255, 256, -1]);
console.log(bytes); // wraps around: [255, 0, 255]

// ---- Holes and array-likes ----
console.log([1, , 3].length, Array.from("hi"));
