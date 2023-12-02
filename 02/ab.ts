import { readFileSync } from 'fs'

type CubeColorCombo = [r: number, g: number, b: number]

const initGameIsImpossible =
    (start: CubeColorCombo) => (reveals: CubeColorCombo[]) =>
        reveals.some(
            (reveal: CubeColorCombo) =>
                reveal[0] > start[0] ||
                reveal[1] > start[1] ||
                reveal[2] > start[2]
        )

const minPower = (reveals: CubeColorCombo[]) =>
    [0, 1, 2]
        .map((index) =>
            reveals.map((r) => r[index]).reduce((acc, e) => Math.max(acc, e, 0))
        )
        .reduce((acc, e) => acc * e, 1)

const revealToColorCombo = (reveal: string): CubeColorCombo =>
    ['red', 'green', 'blue'].map((c) =>
        parseInt(reveal.match(new RegExp(`(\\d+) ${c}`, 'g'))?.[0] || '0')
    ) as CubeColorCombo

const play = (start: CubeColorCombo, filePath: string) => {
    const gameIsImpossible = initGameIsImpossible(start)

    const games = readFileSync(filePath, 'utf-8')
        .split('\n')
        .filter((s) => s.length > 0)
        .map((gameRow) => ({
            id: parseInt(gameRow.match(/(\d+):/)?.[1] as string),
            reveals: gameRow
                .match(/:(.*)/)?.[1]
                .split(';')
                .map(revealToColorCombo) as CubeColorCombo[],
        }))

    console.log(
        games.reduce(
            (acc, g) => (acc += gameIsImpossible(g.reveals) ? 0 : g.id),
            0
        )
    )
    console.log(games.reduce((acc, g) => (acc += minPower(g.reveals)), 0))
}

console.log(play([12, 13, 14], './02/input.txt'))
