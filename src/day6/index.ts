import {test, readInput} from "../utils/index"

const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readInput())

function formatGroups(groups) {
    groups.forEach((group, index) => {
        groups[index] = group.split('\n');
        groups[index] = groups[index].filter(g => g);
    });
}

const goA = (input) => {
    const groups = input.split('\n\n')
    let totalAnswerCount = 0;
    formatGroups(groups);

    groups.forEach((group) => {
        //Could've also used a SET to identify unique ones. But this solution works fine for this specific case.
        for(let i = 0; i < 26; i++) {
            let character = String.fromCharCode(97 + i);
            let charFound = false;
            group.forEach((answer) => {
                if(answer.indexOf(character) > -1) {
                    if(!charFound) {
                        charFound = true;
                        totalAnswerCount++;
                    }
                }
            })
        }
    });
    return totalAnswerCount;
}

const goB = (input) => {
    const groups = input.split('\n\n');
    let totalAnswerCount = 0;
    formatGroups(groups);

    groups.forEach((group) => {
        for(let i = 0; i < 26; i++) {
            let character = String.fromCharCode(97 + i);
            let charFound = true;
            group.forEach((answer) => {
                if(answer.indexOf(character) == -1) {
                    charFound = false;
                }
            });
            if(charFound) {
                totalAnswerCount++;
            }
        }
    });
    return totalAnswerCount;
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
