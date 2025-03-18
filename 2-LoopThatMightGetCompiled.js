// A function to add up numbers in an array
function addNumbers(numbers) {
    let sum = 0; // Start with 0
    
    // Loop through the array and add each number to sum
    for (let i = 0; i < numbers.length; i++) {
      sum += numbers[i];
    }
    
    return sum; // Give back the total
  }
  
  // Test it with an array of numbers
  let myNumbers = [1, 2, 3, 4, 5];
  console.log(addNumbers(myNumbers)); // Outputs: 15
  
  // What happens:
  // 1. The first time this runs, the interpreter reads it line-by-line.
  // 2. The engine’s "monitor" notices the loop (for-loop) runs 5 times.
  // 3. If you call addNumbers() a few more times (e.g., in a bigger program), 
  //    the monitor marks it as "warm."
  // 4. The engine then compiles a faster version (baseline compilation) 
  //    for the loop, assuming "numbers" contains integers.
  // 5. If you keep calling it a LOT, it might make an even faster version 
  //    (optimizing compilation) with tricks like skipping type checks.