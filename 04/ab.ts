import { readFileSync } from 'fs'

const lines = readFileSync('./04/input.txt', 'utf-8')
    .split('\n')
    .filter((s) => s.length > 0)

let score = 0
const cardNbrToNbrCopies = new Map()
lines.forEach((line) => {
    const parts = line.split(/:|\|/g)
    const cardNbr = parseInt(parts[0]?.match(/(\d+)/g)?.[0] || '0')
    const winners = new Set(parts[1].match(/(\d+)/g)?.map((s) => parseInt(s)))
    const myNumbers = parts[2].match(/(\d+)/g)?.map((s) => parseInt(s)) || []
    cardNbrToNbrCopies.set(cardNbr, 1 + (cardNbrToNbrCopies.get(cardNbr) || 0))
    const nbrWinners = myNumbers.filter((number) => winners.has(number)).length
    score += Math.floor(
        myNumbers.reduce(
            (acc, number) => acc * (winners.has(number) ? 2 : 1),
            1
        ) / 2
    )
    for (
        let copyIndex = 0;
        copyIndex < cardNbrToNbrCopies.get(cardNbr);
        copyIndex++
    ) {
        for (let i = 0; i < nbrWinners; i++) {
            const targetCardNbr = i + 1 + cardNbr
            cardNbrToNbrCopies.set(
                targetCardNbr,
                1 + (cardNbrToNbrCopies.get(targetCardNbr) || 0)
            )
        }
    }
})

console.log(score)
console.log(
    Array.from(cardNbrToNbrCopies.values()).reduce(
        (acc: number, e: number) => acc + e,
        0
    )
)
