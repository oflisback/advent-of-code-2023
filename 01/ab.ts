import { readFileSync } from 'fs'

type Numbers = Record<string, number>
type NumbersKey = keyof Numbers

const TextNumbers: Numbers = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
} as const

export const getDigit = (substring: string) => {
    const val = parseInt(substring[0])
    if (typeof val === 'number' && !Number.isNaN(val)) {
        return val
    }
    return null
}

const getDigitIncludingTextDigit = (substring: string) => {
    const regularNumber = getDigit(substring)
    if (regularNumber !== null) {
        return regularNumber
    }

    const numberKeys = Object.keys(TextNumbers)
    for (let i = 0; i < numberKeys.length; i++) {
        if (substring.startsWith(numberKeys[i])) {
            const key = numberKeys[i]
            return TextNumbers[key]
        }
    }

    return null
}

export const findFirstAndLast = (
    row: string,
    getDigitFn: (val: string) => number | null
) => {
    let first = null
    let last = null
    for (var i = 0; i < row.length; i++) {
        const number = getDigitFn(row.substring(i))
        if (number) {
            if (!first) {
                first = number
            }
            last = number
        }
    }
    if (!first || !last) {
        throw new Error('Row without number')
    }
    return [first, last]
}

export const getCalibrationNumberSumA = (data: string[]) =>
    data
        .map((row) => findFirstAndLast(row, getDigit))
        .reduce((acc, [first, last]) => acc + (first * 10 + last), 0)

export const getCalibrationNumberSumB = (data: string[]) =>
    data
        .map((row) => findFirstAndLast(row, getDigitIncludingTextDigit))
        .reduce((acc, [first, last]) => acc + (first * 10 + last), 0)

const data = readFileSync('./01/input.txt', 'utf-8')
    .split('\n')
    .filter((r) => r.length > 0)

console.log(getCalibrationNumberSumA(data))
console.log(getCalibrationNumberSumB(data))
