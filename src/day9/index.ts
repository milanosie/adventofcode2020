import {test, readInput} from "../utils/index"

const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readInput()).split('\n').filter(n => n).map(n => Number(n));

const goA = (input) => {
    return isPreAmbleValid(input, 25);

}

const goB = (input) => {
    return getContiguousValues(input, 22406676);
}

const isPreAmbleValid = (input, preAmbleLength) => {
    let found = 0;
    for (let i = 0; i < input.length - preAmbleLength; i++) {
        const result = input[i + preAmbleLength];
        const subSet = input.slice(i, i + preAmbleLength);
        if (!found) {
            let answerPossible = false;
            subSet.forEach((number1) => {
                subSet.forEach((number2) => {
                    if (Number(number1) + Number(number2) == Number(result)) {
                        answerPossible = true;
                    }
                });
            });
            if (!answerPossible) {
                found = result;
            }
        }
    }
    return found;
}

const getContiguousValues = (input, answer) => {
    let found = {small: -1, big: -1};
    for (let i = 0; i < input.length; i++) {
        let result = addUp(0, input, i, answer);
        if (result != -1) {
            let subSet = input.slice(i, result);
            found = {small: Math.min(...subSet), big: Math.max(...subSet)};
        }
    }
    return found.small + found.big;
}

const addUp = (currentValue, input, index, answer) => {
    if (currentValue + input[index] > answer) {
        return -1;
    } else if (currentValue + input[index] < answer) {
        return addUp(currentValue + input[index], input, index + 1, answer);
    } else if (currentValue + input[index] == answer && input[index] != answer) {
        return index;
    }
    else {
        return -1;
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
