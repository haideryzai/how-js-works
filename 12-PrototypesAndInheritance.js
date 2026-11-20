// Goal: Understand JavaScript's real inheritance model: prototype chains.

const animal = {
  eats: true,
  describe() { return `${this.name} eats: ${this.eats}`; },
};

const dog = Object.create(animal); // dog's prototype is animal
dog.name = "Rex";
console.log(dog.describe());                    // Outputs: "Rex eats: true"
console.log(Object.getPrototypeOf(dog) === animal); // Outputs: true
console.log(dog.hasOwnProperty("eats"));        // Outputs: false (found up the chain)

// What's happening:
// - Looking up dog.eats: not on dog -> check dog's prototype (animal) -> found.
// - The chain ends at Object.prototype, then null. Not found anywhere = undefined.

// ---- Constructor functions and .prototype ----
function Car(brand) { this.brand = brand; }
Car.prototype.honk = function () { return `${this.brand} says beep`; };

const c1 = new Car("Volvo");
const c2 = new Car("Fiat");
console.log(c1.honk(), "|", c2.honk());
console.log(c1.honk === c2.honk); // Outputs: true (one shared method, not a copy)
console.log(c1 instanceof Car);   // Outputs: true

// ---- Shadowing ----
c1.honk = () => "custom";
console.log(c1.honk(), c2.honk()); // Outputs: "custom" "Fiat says beep"

// ---- Built-ins use the same mechanism ----
console.log([].__proto__ === Array.prototype);                 // Outputs: true
console.log(Object.getPrototypeOf(Array.prototype) === Object.prototype); // Outputs: true

// Key takeaway:
// - Objects delegate to their prototype. "class" (next file) is syntax over this system.
