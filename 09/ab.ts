import { readFileSync } from 'fs'

const lines = readFileSync('./09/input.txt', 'utf-8')
    .split('\n')
    .filter((l) => l.length > 0)

const sequences = lines.map((l) => l.split(' ').map((v) => parseInt(v)))

const getDiffSeq = (seq: number[]) => {
    const diffSeq = []
    for (let i = 0; i < seq.length - 1; i++) {
        diffSeq.push(seq[i + 1] - seq[i])
    }
    return diffSeq
}

enum Border {
    InFront,
    Behind,
}

const growBehindUntilDone = (tails: number[]) => tails.reduce((acc, e) => acc + e, 0)
const growInFrontUntilDone = (heads: number[]) => heads.reduce((acc, e) => e - acc, 0)

const extrapolate = (seq: number[], border: Border) => {
    const borderNumbers: number[] = []
    while (true) {
        if (seq.every((v: number) => v === 0)) {
            borderNumbers.unshift(0)
            const growFn = border === Border.InFront ? growInFrontUntilDone : growBehindUntilDone
            return growFn(borderNumbers)
        }
        borderNumbers.unshift(seq[border === Border.InFront ? 0 : seq.length - 1])
        seq = getDiffSeq(seq)
    }
}

console.log(sequences.reduce((acc, e) => acc + extrapolate(e, Border.Behind), 0))
console.log(sequences.reduce((acc, e) => acc + extrapolate(e, Border.InFront), 0))
