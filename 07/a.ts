import { readFileSync } from 'fs'

enum HandType {
    HighCard = 0,
    OnePair = 1,
    TwoPair = 2,
    Three = 3,
    FullHouse = 4,
    Four = 5,
    Five = 6,
}

type Hand = {
    bid: number
    cards: string[]
}

type ScoredHand = Hand & {
    type: HandType
}

const hands = readFileSync('07/input.txt', 'utf-8')
    .split('\n')
    .filter((l) => l.length > 0)
    .map((l) => ({ bid: parseInt(l.split(' ')[1]), cards: l.split(' ')[0].split('') }))

const ranks = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']

const compareByType = (hand1: ScoredHand, hand2: ScoredHand) => hand1.type - hand2.type

const compareByCardStrength = (hand1: ScoredHand, hand2: ScoredHand) => {
    for (let i = 0; i < hand1.cards.length; i++) {
        const diff =
            ranks.findIndex((r) => r === hand1.cards[i]) -
            ranks.findIndex((r) => r === hand2.cards[i])
        if (diff !== 0) {
            return diff
        }
    }
    return 0
}

const compareHands = (hand1: ScoredHand, hand2: ScoredHand) => {
    const typeDiff = compareByType(hand1, hand2)
    if (typeDiff !== 0) {
        return typeDiff
    }
    return compareByCardStrength(hand1, hand2)
}

const nbrOcc = (card: string, cards: string[]) => cards.filter((c: string) => c === card).length

const getType = (cards: string[]) => {
    const cardTypes = new Set(cards)
    if (cardTypes.size === 1) {
        return HandType.Five
    }
    if (cardTypes.size === 2) {
        const instances = cards.filter((c) => c === cardTypes.values().next().value).length
        if ([1, 4].includes(instances)) {
            return HandType.Four
        }
        return HandType.FullHouse
    }
    if (cardTypes.size === 3) {
        if (
            nbrOcc(cards[0], cards) === 3 ||
            nbrOcc(cards[1], cards) === 3 ||
            nbrOcc(cards[2], cards) === 3
        ) {
            return HandType.Three
        }
        return HandType.TwoPair
    }
    if (cardTypes.size === 4) {
        return HandType.OnePair
    }
    return HandType.HighCard
}

const scoredHands = hands.map((hand: Hand) => ({
    ...hand,
    type: getType(hand.cards),
}))

scoredHands.sort(compareHands)
console.log(scoredHands)

let score = 0
scoredHands.forEach((hand: Hand, index: number) => {
    score += hand.bid * (index + 1)
})
console.log(score)
