// A function to sum numbers 1000 times
function sumALot() {
    let sum = 0;
    
    // This loop runs 1000 times—lots of repetition!
    for (let i = 0; i < 1000; i++) {
      sum += i; // Add the current number to sum
    }
    
    return sum;
  }
  
  console.log(sumALot()); // Outputs: 499500
  
  // What happens:
  // 1. First run: Interpreter runs the loop line-by-line (1000 steps).
  // 2. The monitor sees this loop is "hot" (runs a lot in one go).
  // 3. Baseline compiler makes a fast version, assuming "sum" and "i" are numbers.
  // 4. Optimizing compiler kicks in, moving type checks outside the loop 
  //    and making it super fast.
  // 5. Result: The loop runs much faster than if it were interpreted every time!