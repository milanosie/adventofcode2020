/*
This can be done way easier and shorter, but I don't feel like refactoring code on my saturday morning.
 */

import {test, readInput} from "../utils/index"

const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readInput())

let currentRowMin = 0;
let currentRowMax = 127;

let currentColumnMin = 0;
let currentColumnMax = 7;

let currentHighestId = 0;

let foundSeats = [];
const goA = (input) => {
    const boardingPasses = input.split(/\r?\n/).filter(i => i);
    boardingPasses.forEach((boardingPass) => {
        let formattedBoardingPass = getRowNumberAndSeat(boardingPass);
        currentRowMin = 0;
        currentRowMax = 127;
        currentColumnMin = 0;
        currentColumnMax = 7;
        if (formattedBoardingPass.seatId > currentHighestId) {
            currentHighestId = formattedBoardingPass.seatId;
        }
    });

    return currentHighestId;
}

const goB = (input) => {
    const boardingPasses = input.split(/\r?\n/).filter(i => i);
    boardingPasses.forEach((boardingPass) => {
        let formattedBoardingPass = getRowNumberAndSeat(boardingPass);
        currentRowMin = 0;
        currentRowMax = 127;
        currentColumnMin = 0;
        currentColumnMax = 7;

        foundSeats.push(formattedBoardingPass);
    });
    foundSeats.sort(sortColumn);
    foundSeats.sort(sortRow);

    let mySeat = 0;

    for (let i = foundSeats[0].row; i < foundSeats[foundSeats.length - 1].row; i++) {
        let rows = foundSeats.filter((fs) => fs.row == i);
        if (rows.length != 8) {
            rows.forEach((r, index) => {
                if(rows[index + 1]) {
                    if(r.seatId + 1 != rows[index + 1].seatId) {
                        mySeat = r.seatId + 1;
                        return;
                    }
                }
            })
        }
    }
    return mySeat;
}

function sortRow(a, b) {
    if (parseInt(a.row) < parseInt(b.row)) {
        return -1;
    }
    if (parseInt(a.row) > parseInt(b.row)) {
        return 1;
    }
    return 0;
}

function sortColumn(a, b) {
    if (parseInt(a.column) < parseInt(b.column)) {
        return -1;
    }
    if (parseInt(a.column) > parseInt(b.column)) {
        return 1;
    }
    return 0;
}


function getRowNumberAndSeat(boardingPass): { row: number, column: number, seatId: number } {
    for (let i = 0; i < 10; i++) {
        if (i < 7) {
            getRowNumber(boardingPass.charAt(i), currentRowMin, currentRowMax);
        } else {
            getSeatNumber(boardingPass.charAt(i), currentColumnMin, currentColumnMax);
        }
    }
    if (currentRowMin != currentRowMax) {
        console.error('Code is broken, beep boop beep boop');
    }

    return {row: currentRowMin, column: currentColumnMin, seatId: currentRowMin * 8 + currentColumnMin};
}

function getRowNumber(character, minRange, maxRange) {
    if (character == 'F') {
        currentRowMin = minRange;
        currentRowMax = Math.floor(maxRange - ((maxRange - minRange) / 2));
    } else {
        currentRowMin = Math.ceil(minRange + ((maxRange - minRange) / 2));
        currentRowMax = maxRange;
    }
}

function getSeatNumber(character, minRange, maxRange) {
    if (character == 'L') {
        currentColumnMin = minRange;
        currentColumnMax = Math.floor(maxRange - ((maxRange - minRange) / 2));
    } else {
        currentColumnMin = Math.ceil(minRange + ((maxRange - minRange) / 2));
        currentColumnMax = maxRange;
    }
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
