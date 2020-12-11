import {test, readInput} from "../utils/index"

const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readInput()).split('\n').filter(n => n);

const goA = (input) => {
    // Do X amount of rounds
    let rounds = [];
    rounds.push(input.slice())
    for (let i = 1; i < 6; i++) {
        input.forEach((row, rowIndex) => {
            const seats = [...row];
            seats.forEach((seat, seatIndex) => {
                switch (seat) {
                    case 'L':
                        if (hasAdjacentOccupiedSeat(rounds[i - 1], rowIndex, seatIndex) == 0) {
                            input[rowIndex] = setCharAt(input[rowIndex], seatIndex, '#');
                        }
                        break;
                    case '#':
                        if (hasAdjacentOccupiedSeat(rounds[i - 1], rowIndex, seatIndex) >= 4) {
                            input[rowIndex] = setCharAt(input[rowIndex], seatIndex, 'L');
                        }
                        break;
                    case '.':
                        break;
                }
            })
        });
        rounds.push(input.slice());
    }
    return input.toString().match(new RegExp('#', 'g')).length;
}

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}

const goB = (input) => {
    // Do X amount of rounds
    let rounds = [];
    rounds.push(input.slice())
    for (let i = 1; i < 100; i++) {
        input.forEach((row, rowIndex) => {
            const seats = [...row];
            seats.forEach((seat, seatIndex) => {
                switch (seat) {
                    case 'L':
                        if (hasVisibleOccupiedSeats(rounds[i - 1], rowIndex, seatIndex) == 0) {
                            input[rowIndex] = setCharAt(input[rowIndex], seatIndex, '#');
                        }
                        break;
                    case '#':
                        if (hasVisibleOccupiedSeats(rounds[i - 1], rowIndex, seatIndex) >= 5) {
                            input[rowIndex] = setCharAt(input[rowIndex], seatIndex, 'L');
                        }
                        break;
                    case '.':
                        break;
                }
            })
        });
        rounds.push(input.slice());
    }
    return input.toString().match(new RegExp('#', 'g')).length;
}

// Yes this is a monster, yes I know. It's 7:20AM.
const hasAdjacentOccupiedSeat = (roundInput, rowIndex, seatIndex): number => {
    let numberOfSeats = 0;
    if (rowIndex == 0) {
        if (seatIndex == 0) {
            if (roundInput[rowIndex].charAt(seatIndex + 1) == '#') numberOfSeats++;
            if (roundInput[rowIndex + 1].charAt(seatIndex + 1) == '#') numberOfSeats++;
            if (roundInput[rowIndex + 1].charAt(seatIndex) == '#') numberOfSeats++;
        } else if (seatIndex == roundInput[rowIndex].length) {
            if (roundInput[rowIndex].charAt(seatIndex - 1) == '#') numberOfSeats++;
            if (roundInput[rowIndex + 1].charAt(seatIndex - 1) == '#') numberOfSeats++;
            if (roundInput[rowIndex + 1].charAt(seatIndex) == '#') numberOfSeats++;
        } else {
            if (roundInput[rowIndex].charAt(seatIndex + 1) == '#') numberOfSeats++;
            if (roundInput[rowIndex + 1].charAt(seatIndex + 1) == '#') numberOfSeats++;
            if (roundInput[rowIndex + 1].charAt(seatIndex) == '#') numberOfSeats++;
            if (roundInput[rowIndex + 1].charAt(seatIndex - 1) == '#') numberOfSeats++;
            if (roundInput[rowIndex].charAt(seatIndex - 1) == '#') numberOfSeats++;
        }
    } else if (rowIndex == roundInput.length - 1) {
        if (seatIndex == 0) {
            if (roundInput[rowIndex].charAt(seatIndex + 1) == '#') numberOfSeats++;
            if (roundInput[rowIndex - 1].charAt(seatIndex + 1) == '#') numberOfSeats++;
            if (roundInput[rowIndex - 1].charAt(seatIndex) == '#') numberOfSeats++;
        } else if (seatIndex == roundInput[rowIndex].length) {
            roundInput[rowIndex].charAt(seatIndex - 1) == '#'
            if (roundInput[rowIndex - 1].charAt(seatIndex - 1) == '#') numberOfSeats++;
            if (roundInput[rowIndex - 1].charAt(seatIndex) == '#') numberOfSeats++;
        } else {
            if (roundInput[rowIndex].charAt(seatIndex + 1) == '#') numberOfSeats++;
            if (roundInput[rowIndex - 1].charAt(seatIndex + 1) == '#') numberOfSeats++;
            if (roundInput[rowIndex - 1].charAt(seatIndex) == '#') numberOfSeats++;
            if (roundInput[rowIndex - 1].charAt(seatIndex - 1) == '#') numberOfSeats++;
            if (roundInput[rowIndex].charAt(seatIndex - 1) == '#') numberOfSeats++;
        }
    } else {
        if (seatIndex == 0) {
            if (roundInput[rowIndex].charAt(seatIndex + 1) == '#') numberOfSeats++;
            if (roundInput[rowIndex - 1].charAt(seatIndex + 1) == '#') numberOfSeats++;
            if (roundInput[rowIndex - 1].charAt(seatIndex) == '#') numberOfSeats++;
            if (roundInput[rowIndex + 1].charAt(seatIndex + 1) == '#') numberOfSeats++;
            if (roundInput[rowIndex + 1].charAt(seatIndex) == '#') numberOfSeats++;
        } else if (seatIndex == roundInput[rowIndex].length) {
            if (roundInput[rowIndex].charAt(seatIndex - 1) == '#') numberOfSeats++;
            if (roundInput[rowIndex - 1].charAt(seatIndex - 1) == '#') numberOfSeats++;
            if (roundInput[rowIndex - 1].charAt(seatIndex) == '#') numberOfSeats++;
            if (roundInput[rowIndex + 1].charAt(seatIndex - 1) == '#') numberOfSeats++;
            if (roundInput[rowIndex + 1].charAt(seatIndex) == '#') numberOfSeats++;
        } else {
            if (roundInput[rowIndex].charAt(seatIndex + 1) == '#') numberOfSeats++;
            if (roundInput[rowIndex - 1].charAt(seatIndex + 1) == '#') numberOfSeats++;
            if (roundInput[rowIndex - 1].charAt(seatIndex) == '#') numberOfSeats++;
            if (roundInput[rowIndex - 1].charAt(seatIndex - 1) == '#') numberOfSeats++;
            if (roundInput[rowIndex].charAt(seatIndex - 1) == '#') numberOfSeats++;
            if (roundInput[rowIndex + 1].charAt(seatIndex - 1) == '#') numberOfSeats++;
            if (roundInput[rowIndex + 1].charAt(seatIndex) == '#') numberOfSeats++;
            if (roundInput[rowIndex + 1].charAt(seatIndex + 1) == '#') numberOfSeats++;
        }
    }
    return numberOfSeats;
}

const hasVisibleOccupiedSeats = (roundInput, rowIndex, seatIndex): number => {
    let numberOfSeats = 0;
    //check in row
    numberOfSeats += checkRow(roundInput[rowIndex], seatIndex, -1); //Check to the left
    numberOfSeats += checkRow(roundInput[rowIndex], seatIndex, 1); //Check to the right

    numberOfSeats += checkUpDown(roundInput, rowIndex, seatIndex, -1);
    numberOfSeats += checkUpDown(roundInput, rowIndex, seatIndex, 1);

    numberOfSeats += checkDiagonal(roundInput, rowIndex, seatIndex, -1, -1);
    numberOfSeats += checkDiagonal(roundInput, rowIndex, seatIndex, 1, 1);
    numberOfSeats += checkDiagonal(roundInput, rowIndex, seatIndex, -1, 1);
    numberOfSeats += checkDiagonal(roundInput, rowIndex, seatIndex, 1, -1);

    return numberOfSeats;
}

const checkRow = (row, seatIndex, nextPosition) => {
    const seatToCheck = row.charAt(seatIndex + nextPosition);
    if(seatToCheck) {
        if(seatToCheck == '#') {
            return 1;
        }
        else if(seatToCheck == 'L') {
            return 0;
        }
        else {
            return checkRow(row, seatIndex + nextPosition, nextPosition);
        }
    }
    else {
        return 0;
    }
}

const checkUpDown = (input, rowNumber, seatNumber, nextPosition) => {
    if(input[rowNumber + nextPosition]) {
        const seatToCheck = input[rowNumber + nextPosition].charAt(seatNumber);
        if(seatToCheck == '#') {
            return 1;
        }
        else if(seatToCheck == 'L') {
            return 0;
        }
        else {
            return checkUpDown(input, rowNumber + nextPosition, seatNumber, nextPosition);
        }
    } else {
        return 0;
    }
}

const checkDiagonal = (input, rowIndex, seatIndex, nextRowPosition, nextSeatPosition) => {
    if(input[rowIndex + nextRowPosition]) {
        const seatToCheck = input[rowIndex + nextRowPosition].charAt(seatIndex + nextSeatPosition);
        if(seatToCheck) {
            if(seatToCheck == '#') {
                return 1;
            }
            else if(seatToCheck == 'L') {
                return 0;
            }
            else {
                return checkDiagonal(input, rowIndex + nextRowPosition, seatIndex + nextSeatPosition, nextRowPosition, nextSeatPosition);
            }
        }
        else {
            return 0;
        }
    }
    else {
        return 0;
    }

}
/* Tests */

// test()

/* Results */

console.time("Time puzzle 1")
// const resultA = goA(input)
console.timeEnd("Time puzzle 1")

console.time("Time puzzle 2")
const resultB = goB(input)
console.timeEnd("Time puzzle 2")

// console.log("Solution to part 1:", resultA)
console.log("Solution to part 2:", resultB)
