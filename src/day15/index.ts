import {test, readInput} from "../utils/index"

const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readInput()).split(',').filter(n => n).map(n => Number(n));

class NumberSpoken {
    turn: number;
    spoken: number;
}

const getNextNumber = (number: NumberSpoken, numbersSpoken: NumberSpoken[]): number => {
    if (numbersSpoken.find(ns => ns.turn == 2020) != undefined) {
        return numbersSpoken.find(ns => ns.turn == 2020).spoken;
    }
    let reversedArray = numbersSpoken.sort((a, b) => (a.turn > b.turn) ? -1 : 1);
    let previouslySpoken = reversedArray.find(ra => ra.spoken == number.spoken && ra.turn != number.turn);
    if (previouslySpoken == undefined) {
        numbersSpoken.push({
            turn: number.turn + 1,
            spoken: 0
        });
        return getNextNumber(numbersSpoken[numbersSpoken.length - 1], numbersSpoken);

    }
    // It's found, in reversed array;
    else {
        numbersSpoken.push({
            turn: number.turn + 1,
            spoken: number.turn - previouslySpoken.turn,
        });
        return getNextNumber(numbersSpoken.find(ns => ns.turn == numbersSpoken.length), numbersSpoken);
    }
}

const goA = (input) => {
    let numbersSpoken: NumberSpoken[] = [];

    input.forEach((ns: number, index) => {
        numbersSpoken.push({
            turn: index + 1,
            spoken: ns
        })
    })
    return getNextNumber(numbersSpoken.find(ns => ns.turn == numbersSpoken.length), numbersSpoken);
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
