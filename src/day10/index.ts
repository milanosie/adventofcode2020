import {readInput} from "../utils/index"

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

const goB = (input) => {
    const result: number[] = [];
    input.sort((a, b) => b - a);
    input.forEach((value: number, i: number) => {
        let subResult;
        if(i == 0) {
            subResult = 1
        }
        else {
            subResult = 0;
        }

        for(let j = 3; j >= 1; j--) {
            if(i >= j && getDifference(value, input[i - j]) < 4) {
                subResult += result[i - j];
            }
        }
        result.push(subResult);
    });

    return result[result.length - 1] * 2;
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
