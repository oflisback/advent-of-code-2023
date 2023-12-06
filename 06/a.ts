import { readFileSync } from 'fs'

const lines = readFileSync('./06/input.txt', 'utf-8')
    .split('\n')
    .filter((l) => l.length > 0)

const times = lines[0].match(/(\d+)/g) || []
const distances = lines[1].match(/(\d+)/g) || []

const races = times.map((t, i) => ({
    time: parseInt(t),
    distance: parseInt(distances[i]),
}))

const getDistanceForSpeedAndTime = (speed: number, time: number) => {
    return speed * time
}

const nbrWins: number[] = []
races.forEach(({ time, distance }) => {
    let wins = 0
    for (let speed = 0; speed < time; speed++) {
        if (getDistanceForSpeedAndTime(speed, time - speed) > distance) {
            wins++
        }
    }
    nbrWins.push(wins)
})
console.log(nbrWins.reduce((acc: number, e: number) => acc * e, 1))
