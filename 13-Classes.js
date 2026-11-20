// Goal: Modern class syntax: constructors, inheritance, private fields, static members.

class Animal {
  #energy = 10;                 // Private field: only accessible inside the class
  static count = 0;             // Belongs to the class, not instances

  constructor(name) {
    this.name = name;
    Animal.count++;
  }

  speak() { return `${this.name} makes a sound`; }
  get energy() { return this.#energy; }
  set energy(v) { if (v < 0) throw new RangeError("negative"); this.#energy = v; }
  static create(name) { return new this(name); }
}

class Dog extends Animal {
  speak() { return `${super.speak()} — woof!`; } // Override and call the parent
}

const d = Dog.create("Rex");
console.log(d.speak());           // Outputs: "Rex makes a sound — woof!"
console.log(d.energy);            // Outputs: 10
d.energy = 3;
console.log(d.energy);            // Outputs: 3
console.log(Animal.count);        // Outputs: 1
console.log(d instanceof Animal); // Outputs: true
console.log(d.energy, "#energy" in d); // private fields never show as normal properties

// ---- Classes are prototypes underneath ----
console.log(typeof Animal);                              // Outputs: "function"
console.log(Object.getPrototypeOf(Dog) === Animal);      // Outputs: true
console.log(Object.getPrototypeOf(Dog.prototype) === Animal.prototype); // Outputs: true

// ---- Mixins: composing behaviour ----
const Swimmer = (Base) => class extends Base { swim() { return `${this.name} swims`; } };
class Duck extends Swimmer(Animal) {}
console.log(new Duck("Don").swim()); // Outputs: "Don swims"

// Gotchas: class bodies are strict mode; classes are NOT hoisted like functions;
// calling a class without "new" throws.
