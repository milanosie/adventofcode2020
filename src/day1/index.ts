import { test, readInput } from "../utils/index"
const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readInput())

const goA = (input) => {
  const numbers = input.split(/\r?\n/).filter(i => i).map(n => parseInt(n, 10)).sort((a,b) => a - b);;
  for(let item of numbers) {
    for(let item2 of numbers) {
      if(item !== item2) {
        if((item) + (item2) == 2020) {
          return item * item2;
        }
      }
    }
  }
}

const goB = (input) => {
  const numbers = input.split(/\r?\n/).filter(i => i).map(n => parseInt(n, 10)).sort((a,b) => a - b);
  for(let item of numbers) {
    for(let item2 of numbers) {
      for(let item3 of numbers) {
        if(item !== item2 && item !== item3 && item2 !== item3) {
          if((item) + (item2) + (item3) == 2020) {
            return item * item2 * item3;
          }
        }
      }
    }
  }
}

/* Tests */

// test()

/* Results */

console.time("Time puzzle 1")
const resultA = goA(input)
console.timeEnd("Time puzzle 1")

console.time("Time puzzle 2")
const resultB = goB(input)
console.timeEnd("Time puzzle 2")

console.log("Solution to part 1:", resultA)
console.log("Solution to part 2:", resultB)
