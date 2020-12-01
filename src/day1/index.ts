import { test, readInput } from "../utils/index"
const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readInput())

const goA = (input) => {
  const numbers = input.split(/\r?\n/);
  for(let item of numbers) {
    for(let item2 of numbers) {
      if(item !== item2) {
        if(parseInt(item) + parseInt(item2) == 2020) {
          return item * item2;
        }
      }
    }
  }
}

const goB = (input) => {
  const numbers = input.split(/\r?\n/);
  for(let item of numbers) {
    for(let item2 of numbers) {
      for(let item3 of numbers) {
        if(item !== item2 && item !== item3 && item2 !== item3) {
          if(parseInt(item) + parseInt(item2) + parseInt(item3) == 2020) {
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

console.time("Time")
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd("Time")

console.log("Solution to part 1:", resultA)
console.log("Solution to part 2:", resultB)
