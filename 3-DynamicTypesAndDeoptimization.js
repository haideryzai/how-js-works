// A function that adds two things together
function add(a, b) {
    return a + b; // Add a and b
  }
  
  // Test it with numbers
  console.log(add(5, 10)); // Outputs: 15
  
  // Test it with strings
  console.log(add("Hello, ", "world!")); // Outputs: "Hello, world!"
  
  // What happens:
  // 1. First call (5 + 10): The interpreter runs it as number addition.
  // 2. The monitor sees it’s adding numbers and might compile a fast version 
  //    assuming "a" and "b" are always numbers.
  // 3. Second call ("Hello, " + "world!"): The compiled version fails 
  //    because "+" means string concatenation now, not number addition.
  // 4. The engine "deoptimizes"—throws out the number-only version 
  //    and goes back to the interpreter or makes a new compiled version 
  //    for strings.
  // 5. This flexibility is why JavaScript is powerful but can be unpredictable!