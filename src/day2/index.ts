import { test, readInput } from "../utils/index"

const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readInput())

const goA = (input) => {
  const passwords = input.split(/\r?\n/).filter(i => i);
  let valid = 0;
  passwords.forEach((p) => {
    let occurences = 0;
    const minNumber = p.substr(0, p.indexOf('-'));
    const maxNumber = p.substr(p.indexOf('-') + 1, p.indexOf(' ') - p.indexOf('-') );
    const letter = p.substr(p.indexOf(' ') + 1, 1);
    const password = p.substr(p.indexOf(':') + 2);
    password.split('').forEach(function(s) {
      if(s == letter) {
        occurences++;
      }
    });
    if(occurences >= minNumber && occurences <= maxNumber) {
      valid++;
    }
  });
  return valid;
}

const goB = (input) => {
  const passwords = input.split(/\r?\n/).filter(i => i);
  let valid = 0;
  passwords.forEach((p) => {
    let occurences = 0;
    const positionOne = p.substr(0, p.indexOf('-'));
    const positionTwo = p.substr(p.indexOf('-') + 1, p.indexOf(' ') - p.indexOf('-') );
    const letter = p.substr(p.indexOf(' ') + 1, 1);
    const password = p.substr(p.indexOf(':') + 2);

    if(password.substr(parseInt(positionOne) - 1, 1) == letter) {
      occurences++;
    }
    if(password.substr(parseInt(positionTwo) - 1, 1) == letter) {
      occurences++;
    }
    if(occurences == 1) {
      valid++;
    }
  });
  return valid;
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
