import {readInput} from "../utils/index"

const prepareInput = (rawInput: string) => rawInput

const fileInput = prepareInput(readInput()).split('\n').filter(n => n);
let visited: number[] = [];
let finalValue: number;

function goA(input) {
  input = parseInput(input);
  return readNextInstruction(input, 0, 0);
}

function goB(input) {
  for(let i = 1; i < input.length; i++) {
    visited = [];
    let instructions = input;
    if(instructions[i][0] == 'nop') {
      instructions[i][0] = 'jmp';
      readNextInstruction(instructions, 0, 0);
      instructions[i][0] = 'nop';
    }
    else if(instructions[i][0] == 'jmp') {
      instructions[i][0] = 'nop';
      readNextInstruction(instructions, 0, 0);
      instructions[i][0] = 'jmp';
    }
  }
  return finalValue;
}

function parseInput(input) {
  input.forEach((row, index) => {
    input[index] = row.split(' ');
    input[index][1] = parseInt(input[index][1]);
  });
  return input;
}

function readNextInstruction(input, accValue, currentIndex) {
  if(currentIndex > input.length - 1) {
    finalValue = accValue;
    return accValue;
  }
  if(visited.find(value => value == currentIndex) != undefined) {
      return accValue;
  }
  visited.push(currentIndex);
  const instruction = input[currentIndex];
  switch(instruction[0]) {
    case 'nop':
      return readNextInstruction(input, accValue, currentIndex + 1);
    case 'acc':
      return readNextInstruction(input, accValue += instruction[1], currentIndex + 1);
    case 'jmp':
      return readNextInstruction(input, accValue, currentIndex + instruction[1]);
    default:
      throw new Error('Unhandled instruction, please throw computer out of window and try again.');
  }

}

/* Results */

console.time("Time puzzle 1")
const resultA = goA(fileInput)
console.timeEnd("Time puzzle 1")

console.time("Time puzzle 2")
const resultB = goB(fileInput)
console.timeEnd("Time puzzle 2")

console.log("Solution to part 1:", resultA)
console.log("Solution to part 2:", resultB)
