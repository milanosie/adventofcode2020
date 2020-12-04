import {test, readInput} from "../utils/index"

const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readInput())

const passportAttributes = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

const goA = (input) => {
    const passports = input.split('\n\n');
    let validPassports = 0;
    passports.forEach((passport) => {
        if (isPassportValid(passport)) {
            validPassports++;
        }
    });
    return validPassports;
}

function formatPassport(passport): any {
    //This can be done way better, but for time purposes im doing it like this.
    let attributes = passport.split(' ');
    attributes = attributes.toString().split('\n');
    attributes = attributes.toString().split(',');
    return attributes;
}

const goB = (input) => {
    const passports = input.split('\n\n');
    let validPassports = 0;
    passports.forEach((passport) => {
        if (!isPassportValid(passport)) {
            return;
        }
        let formattedPassport = formatPassport(passport);
        if (isPassportValidStrict(formattedPassport)) {
            validPassports++;
        }
    });
    return validPassports;
}

function isPassportValid(passport: any): boolean {
    let valid = true;
    passportAttributes.forEach((pa) => {
        if (passport.indexOf(pa) == -1) {
            valid = false;
        }
    });
    return valid;
}

function isPassportValidStrict(passport: any): boolean {
    let valid = true;
    passport.forEach((pa) => {
        let keyValue = pa.split(':');
        if (valid) {
            switch (keyValue[0]) {
                case 'byr':
                    valid = parseInt(keyValue[1]) >= 1920 && parseInt(keyValue[1]) <= 2002;
                    break;
                case 'iyr':
                    valid = parseInt(keyValue[1]) >= 2010 && parseInt(keyValue[1]) <= 2020;
                    break;
                case 'eyr':
                    valid = parseInt(keyValue[1]) >= 2020 && parseInt(keyValue[1]) <= 2030;
                    break;
                case 'hgt':
                    if (keyValue[1].indexOf('cm') != -1) {
                        let height = parseInt(keyValue[1].substr(0, keyValue[1].indexOf('cm') + 1));
                        valid = height >= 150 && height <= 193;
                    } else if (keyValue[1].indexOf('in') != -1) {
                        let height = parseInt(keyValue[1].substr(0, keyValue[1].indexOf('in') + 1));
                        valid = height >= 59 && height <= 76;
                    } else valid = false;
                    break;
                case 'hcl':
                    if (keyValue[1].indexOf('#') == 0) {
                        valid = keyValue[1].length == 7;
                    } else valid = false;
                    break;
                case 'ecl':
                    valid = (keyValue[1] == 'amb' || keyValue[1] == 'blu' || keyValue[1] == 'brn' || keyValue[1] == 'gry' || keyValue[1] == 'grn' || keyValue[1] == 'hzl' || keyValue[1] == 'oth');
                    break;
                case 'pid':
                    valid = keyValue[1].length == 9;
                    break;
                default:
                    valid = true;
            }
        }
    })
    return valid;
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
