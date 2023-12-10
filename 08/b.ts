import { readFileSync } from 'fs'

const lines = readFileSync('./08/input.txt', 'utf-8')
    .split('\n')
    .filter((l) => l.length > 0)

const instructions = lines[0].split('')

const nodes = new Map()

type Node = {
    name: string
    left: string
    right: string
}

lines.slice(1).forEach((l) => {
    const [name, left, right] = l.match(/([0-9|A-Z]+)/g)!

    nodes.set(name, { left, name, right })
})

const startNodes = Array.from(nodes.values())
    .filter((v: Node) => v.name.endsWith('A'))
    .map((n) => n.name)

let cycles: number[] = []
startNodes.forEach((startName) => {
    console.log('startName: ', startName)
    let cur = nodes.get(startName)
    let steps = 0
    console.log('cur: ', cur)
    while (!cur.name.endsWith('Z')) {
        instructions.forEach((i) => {
            steps += 1
            if (i === 'L') {
                cur = nodes.get(cur.left)
            } else {
                cur = nodes.get(cur.right)
            }
        })
    }
    cycles.push(steps)
})

// Divide by lcd, then multiply all the cycle factors, including the lcd.
// Have not really done the math ...
for (let i = 2; i < Math.max(...cycles); i++) {
    if (cycles.filter((c) => c % i === 0).length === cycles.length) {
        cycles = cycles.map((c) => c / i)
        console.log(i * cycles.reduce((acc, e) => acc * e, 1))
    }
}
