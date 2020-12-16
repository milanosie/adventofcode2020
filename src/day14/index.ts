import { test, readInput } from "../utils/index"

const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readInput()).split('\n').filter(n => n);

const goA = (input) => {
  return
}

const goB = (input) => {
  return
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
