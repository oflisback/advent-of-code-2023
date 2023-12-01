import { expect, test } from 'vitest'
import { readFileSync } from 'fs'
import {
    findFirstAndLast,
    getDigit,
    getCalibrationNumberSumA,
    getCalibrationNumberSumB,
} from './ab'

test('find first and last number', () => {
    expect(findFirstAndLast('asdf1asdf4', getDigit)).toStrictEqual([1, 4])
})

test('get calibration number sum', () => {
    const exampleData = readFileSync('./01/example-input.txt', 'utf-8')
        .split('\n')
        .filter((r) => r.length > 0)

    expect(getCalibrationNumberSumA(exampleData)).toStrictEqual(142)
})

test('get calibration number sum b', () => {
    const exampleData = readFileSync('./01/example-b-input.txt', 'utf-8')
        .split('\n')
        .filter((r) => r.length > 0)

    expect(getCalibrationNumberSumB(exampleData)).toStrictEqual(281)
})

test('get calibration number sum with text numbers', () => {
    const exampleData = [
        'kjrqmzv9mmtxhgvsevenhvq7',
        'four2tszbgmxpbvninebxns6nineqbqzgjpmpqr',
    ]

    expect(getCalibrationNumberSumB(exampleData)).toStrictEqual(97 + 49)
})
