import { readFileSync } from 'fs'

const lines = readFileSync('./06/input.txt', 'utf-8')
    .split('\n')
    .filter((l) => l.length > 0)

const time = parseInt(
    lines[0]
        .split(' ')
        .filter((s) => s !== '' && parseInt(s))
        .join('')
)
const distance = parseInt(
    lines[1]
        .split(' ')
        .filter((s) => s !== '' && parseInt(s))
        .join('')
)

const waitTime1 = Math.floor((time + Math.sqrt(time * time - 4 * distance)) / 2)
const waitTime2 = Math.floor(
    1 + (time - Math.sqrt(time * time - 4 * distance)) / 2
)
console.log(waitTime1 - waitTime2 + 1)
