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
        console.log(totalTrees);
        return totalTrees;
    }

    if (rows[y].length >= x) {
        foundTree = rows[y].charAt(x) == '#';
        if (foundTree) {
            totalTrees++;
        }
        return doStep(rows, x, y, totalTrees, xStep, yStep);
    } else {
        const calibratedX = ((x) % rows[y].length);
        foundTree = rows[y].charAt(calibratedX) == '#';
        if (foundTree) {
            totalTrees++;
        }
        return doStep(rows, x, y, totalTrees, xStep, yStep);
    }

}

// goes wrong, still need to do.... after work it is
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

console.time("Time")
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd("Time")

console.log("Solution to part 1:", resultA)
console.log("Solution to part 2:", resultB)
