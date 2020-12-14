import {test, readInput} from "../utils/index"

const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readInput())
    .split('\n')
    .filter(n => n);

enum DIRECTION {
    North = 0,
    East = 90,
    South = 180,
    West = 270
}

function getNewPosition(moveDirection: DIRECTION,
                        steps: number,
                        currentX: number,
                        currentY: number): { currentX: number, currentY: number } {
    switch (moveDirection) {
        case DIRECTION.East:
            currentX += steps;
            break;
        case DIRECTION.West:
            currentX -= steps;
            break;
        case DIRECTION.North:
            currentY += steps;
            break;
        case DIRECTION.South:
            currentY -= steps;
            break;
    }
    return {currentX: currentX, currentY: currentY};
}

const goA = (input) => {
    let facing = DIRECTION.East;
    let position = {
        currentX: 0,
        currentY: 0
    }
    input.forEach((instruction) => {
        const direction = instruction.substr(0, 1);
        const steps = Number(instruction.substr(1));
        switch (direction) {
            case 'L':
            case 'R':
                facing = getFacingDirection(facing, direction, steps);
                break;
            case 'N':
                position = getNewPosition(DIRECTION.North, steps, position.currentX, position.currentY);
                break;
            case 'S':
                position = getNewPosition(DIRECTION.South, steps, position.currentX, position.currentY);
                break;
            case 'W':
                position = getNewPosition(DIRECTION.West, steps, position.currentX, position.currentY);
                break;
            case 'E':
                position = getNewPosition(DIRECTION.East, steps, position.currentX, position.currentY);
                break;
            case 'F':
                position = getNewPosition(facing, steps, position.currentX, position.currentY);
                break;
            default:
                console.error('unhandled');
        }
    });
    // runSomeTests();
    return getManhattanDistance(position.currentX, position.currentY);
}

const getFacingDirection = (currentDirection: DIRECTION, instruction: string, number: number): DIRECTION => {
    switch (instruction) {
        case 'L':
            return currentDirection - number >= 0 ? currentDirection - number : currentDirection + 360 - number;
        case 'R':
            return currentDirection + number <= 270 ? currentDirection + number : currentDirection - 360 + number;
    }
}

const rotateWaypoint = (currentX: number, currentY: number, instruction: string, number: number):
    { currentX: number, currentY: number } => {
    switch (instruction) {
        case "R":
            switch (number) {
                case 90:
                    [currentX, currentY] = [currentY, -currentX];
                    break;
                case 180:
                    [currentX, currentY] = [-currentX, -currentY];
                    break;
                case 270:
                    [currentX, currentY] = [-currentY, currentX];
                    break;
            }
            break;
        case "L":
            switch (number) {
                case 90:
                    [currentX, currentY] = [-currentY, currentX];
                    break;
                case 180:
                    [currentX, currentY] = [-currentX, -currentY];
                    break;
                case 270:
                    [currentX, currentY] = [currentY, -currentX];
                    break;
            }
            break;
    }
    return {currentX: currentX, currentY: currentY};
}

const goB = (input) => {
    let position = {currentX: 0, currentY: 0};
    let wayPointRelativePosition = {currentX: 10, currentY: 1};

    input.forEach((instruction) => {
            const direction = instruction.substr(0, 1);
            const steps = Number(instruction.substr(1));
            switch (direction) {
                case 'L':
                case 'R':
                    wayPointRelativePosition = rotateWaypoint(wayPointRelativePosition.currentX, wayPointRelativePosition.currentY, direction, steps);
                    break;
                case 'N':
                    wayPointRelativePosition = getNewPosition(DIRECTION.North, steps, wayPointRelativePosition.currentX, wayPointRelativePosition.currentY);
                    break;
                case 'S':
                    wayPointRelativePosition = getNewPosition(DIRECTION.South, steps, wayPointRelativePosition.currentX, wayPointRelativePosition.currentY);
                    break;
                case 'W':
                    wayPointRelativePosition = getNewPosition(DIRECTION.West, steps, wayPointRelativePosition.currentX, wayPointRelativePosition.currentY);
                    break;
                case 'E':
                    wayPointRelativePosition = getNewPosition(DIRECTION.East, steps, wayPointRelativePosition.currentX, wayPointRelativePosition.currentY);
                    break;
                case 'F':
                    let currentX = position.currentX + wayPointRelativePosition.currentX * steps;
                    let currentY = position.currentY + wayPointRelativePosition.currentY * steps;
                    position = { currentX: currentX, currentY: currentY };
                    break;
            }
        }
    );
    return getManhattanDistance(position.currentX, position.currentY);
}

const runSomeTests = () => {
    console.log(getFacingDirection(DIRECTION.East, 'L', 180) == DIRECTION.West);
    console.log(getFacingDirection(DIRECTION.East, 'L', 90) == DIRECTION.North);
    console.log(getFacingDirection(DIRECTION.East, 'R', 90) == DIRECTION.South);
    console.log(getFacingDirection(DIRECTION.North, 'R', 270) == DIRECTION.West);
    console.log(getFacingDirection(DIRECTION.North, 'L', 270) == DIRECTION.East);
    console.log(getFacingDirection(DIRECTION.East, 'R', 270) == DIRECTION.North);

    console.log(getNewPosition(DIRECTION.East, 10, 0, 0));
    console.log(getNewPosition(DIRECTION.West, 10, 0, 0));
    console.log(getNewPosition(DIRECTION.South, 10, 0, 0));
    console.log(getNewPosition(DIRECTION.North, 10, 0, 0));
}

const getManhattanDistance = (x, y) => {
    return Math.abs(x) + Math.abs(y);
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
