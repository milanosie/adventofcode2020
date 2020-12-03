import {test, readInput} from "../utils/index"

const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readInput())
const rows = input.split(/\r?\n/).filter(i => i);

const goA = (input) => {
    return doStep(rows, 0, 0, 0, 3, 1);
}

function doStep(rows, currentX, currentY, totalTrees, xStep, yStep): number {
    let x = currentX + xStep;
    let y = currentY + yStep;
    let foundTree = false;
    if (y > rows.length - 1) {
        return totalTrees;
    }

    if (rows[y].length <= x) {
        x = ((x) % rows[y].length);
    }
    foundTree = rows[y].charAt(x) == '#';
    if (foundTree) {
        totalTrees++;
    }
    return doStep(rows, x, y, totalTrees, xStep, yStep);

}

const goB = (input) => {
    return doStep(rows, 0, 0, 0, 1, 1)
        * doStep(rows, 0, 0, 0, 3, 1)
        * doStep(rows, 0, 0, 0, 5, 1)
        * doStep(rows, 0, 0, 0, 7, 1)
        * doStep(rows, 0, 0, 0, 1, 2);
}

/* Tests */

// test()

/* Results */

console.time("Time1")
const resultA = goA(input)
console.timeEnd("Time1");
console.time("Time2");
const resultB = goB(input)
console.timeEnd("Time2");

console.log("Solution to part 1:", resultA)
console.log("Solution to part 2:", resultB)
