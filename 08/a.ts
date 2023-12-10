import { readFileSync } from 'fs'

const lines = readFileSync('./08/input.txt', 'utf-8')
    .split('\n')
    .filter((l) => l.length > 0)

const instructions = lines[0].split('')

const nodes = new Map()

lines.slice(1).forEach((l) => {
    const [name, left, right] = l.match(/([A-Z]+)/g)!

    nodes.set(name, { left, name, right })
})

let cur = nodes.get('AAA')
let steps = 0
while (cur.name !== 'ZZZ') {
    instructions.forEach((i) => {
        steps += 1
        if (i === 'L') {
            cur = nodes.get(cur.left)
        } else {
            cur = nodes.get(cur.right)
        }
    })
}

console.log(steps)
