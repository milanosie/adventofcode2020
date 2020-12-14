import { test, readInput } from "../utils/index"

const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readInput()).split('\n').filter(n => n);

const goA = (input) => {
  const timeOfArrival = Number(input[0]);
  const busses = input[1].split(',').filter(n => n != 'x').map(n => Number(n));
  let busFound = -1;
  let timeStamp = timeOfArrival - 1;
  while(busFound == -1) {
    timeStamp++;
    busses.forEach((bus) => {
      if(timeStamp % bus == 0) {
        busFound = bus;
      }
    });
  }
  console.log(busFound * (timeStamp - timeOfArrival));
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
