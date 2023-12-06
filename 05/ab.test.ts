import { expect, test } from 'vitest'
import { getNewRanges, mapToNext } from './ab'

test('range to the left of already covered', () => {
    expect(getNewRanges([10, 20], [23, 35])).toStrictEqual([[10, 20]])
})

test('range to the right of already covered', () => {
    expect(getNewRanges([40, 45], [23, 35])).toStrictEqual([[40, 45]])
})

test('range overlaps covered completely', () => {
    expect(getNewRanges([40, 90], [50, 60])).toStrictEqual([
        [40, 49],
        [60, 90],
    ])
})

test('range fully inside covered', () => {
    expect(getNewRanges([4, 5], [2, 100])).toStrictEqual([])
})

test('range overlaps left side of covered', () => {
    expect(getNewRanges([4, 15], [10, 100])).toStrictEqual([[4, 10]])
})

test('range overlaps right side of covered', () => {
    expect(getNewRanges([86, 120], [10, 100])).toStrictEqual([[100, 120]])
})

test('mapToNext', () => {
    expect(mapToNext(10, { sStart: 0, dStart: 0, len: 10 })).toBe(10)
    expect(mapToNext(3, { sStart: 0, dStart: 5, len: 10 })).toBe(3 + 5)
    expect(mapToNext(3, { sStart: 5, dStart: 0, len: 10 })).toBe(3)
    expect(mapToNext(6, { sStart: 5, dStart: 0, len: 10 })).toBe(1)
    expect(mapToNext(6, { sStart: 6, dStart: 10, len: 10 })).toBe(10)
    expect(mapToNext(10, { sStart: 6, dStart: 10, len: 4 })).toBe(10)
})
