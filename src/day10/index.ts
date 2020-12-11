import {test, readInput} from "../utils/index"

const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readInput())
    .split('\n')
    .filter(n => n)
    .map(n => parseInt(n))
    .sort((a, b) => a > b ? 1 : -1);

const goA = (input) => {
    let dif1 = 1;
    let dif3 = 1;

    for (let i = 0; i < input.length; i++) {
        if (input[i + 1] - 1 == input[i]) {
            dif1++;
        }
        if (input[i + 1] - 3 == input[i]) {
            dif3++;
        }
    }
    return dif1 * dif3;
}
const getDifference = (a, b): number => {
    return b - a;
}
const checkIfCanBeRemoved = (input, i: any, number: number, totalRemovedNumbers): number => {
    if (input[i + number] != undefined) {
        if (getDifference(input[i], input[i + number]) > 3) {
            console.log(totalRemovedNumbers);
            //No more numbers can be removed DIRECTLY, but maybe later in the line?
            return totalRemovedNumbers;
        } else {
            return checkIfCanBeRemoved(input, i, number + 1, totalRemovedNumbers + 1);
        }
    } else {
        return totalRemovedNumbers;
    }

}

const goB = (input) => {
    const adapterRating = Math.max(...input) + 3;
    let totalPossibilities = 0;
    for (let i = 0; i < input.length; i++) {
        totalPossibilities += checkIfCanBeRemoved(input, i, 1, 0);
    }
    return totalPossibilities * totalPossibilities * 8;
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
