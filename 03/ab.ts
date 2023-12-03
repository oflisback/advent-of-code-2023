import { readFileSync } from 'fs'

const symbolCoords = new Set()
const coveredCoordToPotentialPartNumbers = new Map()
const gears: string[] = []

const rows = readFileSync('./03/input.txt', 'utf-8').split('\n').slice(0, -1)

rows.forEach((row, y) => {
    let x = 0
    const tokens = row
        .split(/(\.)/g)
        .filter((s) => s !== '')
        .map((s) => (s === '.' ? '' : s))
        .map((s) => s.match(/\d+|\D/g) || '')
        .flat()
    tokens.forEach((token) => {
        if (parseInt(token)) {
            for (let coveredY = y - 1; coveredY <= y + 1; coveredY++) {
                for (
                    let coveredX = x - 1;
                    coveredX < x + token.length + 1;
                    coveredX++
                ) {
                    const coord = `${coveredX}x${coveredY}`
                    coveredCoordToPotentialPartNumbers.set(coord, [
                        ...(coveredCoordToPotentialPartNumbers.get(coord) ||
                            []),
                        token,
                    ])
                }
            }
            x += token.length - 1
        } else if (token.length > 0) {
            const coord = `${x}x${y}`
            symbolCoords.add(coord)
            if (token === '*') {
                gears.push(coord)
            }
        }
        x += 1
    })
})

const confirmedPartNumbers: number[] = []
symbolCoords.forEach((symbol) => {
    if (coveredCoordToPotentialPartNumbers.has(symbol)) {
        const newConfirmedNumbers = coveredCoordToPotentialPartNumbers
            .get(symbol)
            .map((v: string) => parseInt(v))
        confirmedPartNumbers.push(...newConfirmedNumbers)
    }
})

console.log(confirmedPartNumbers.reduce((acc: number, e: number) => acc + e, 0))
console.log(
    gears.reduce((acc, gear) => {
        if (coveredCoordToPotentialPartNumbers.has(gear)) {
            const parts = coveredCoordToPotentialPartNumbers.get(gear)
            if (parts.length === 2) {
                return acc + parts[0] * parts[1]
            }
        }
        return acc
    }, 0)
)
