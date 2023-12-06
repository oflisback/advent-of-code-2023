import { readFileSync } from 'fs'

type map = {
    sStart: number
    dStart: number
    len: number
}

const mapLayers: map[][] = Array.from({ length: 7 }, () => [])

let mapLevel = 0
const lines = readFileSync('05/input.txt', 'utf-8')
    .split('\n')
    .filter((s) => s.length > 0)

const seeds =
    lines
        .shift()
        ?.match(/(\d+)/g)
        ?.map((s) => parseInt(s)) || []

lines.slice(1).forEach((l) => {
    if (l.match(/:/)) {
        mapLevel++
        return
    } else {
        const [dStart, sStart, len] = l
            .match(/(\d+)/g)
            ?.map((s: string) => parseInt(s)) || [0, 0, 0]
        mapLayers[mapLevel].push({ sStart, dStart, len })
    }
})

const mapToNext = (
    value: number,
    { sStart, dStart, len }: map
): [number, boolean] => {
    if (value >= sStart && value <= sStart + len) {
        //       console.log('seed was mapped')
        return [value + (dStart - sStart), true]
    }
    //  console.log('seed was not mapped')
    return [value, false]
}

const mapValueThroughLayer = (value: number, layer: map[]) => {
    let mappedValue = value
    //    console.log('    going to map: ', value)
    let mapped = false
    let layerIndex = 0
    while (!mapped && layerIndex < layer.length) {
        ;[mappedValue, mapped] = mapToNext(mappedValue, layer[layerIndex])
        layerIndex++
    }
    return mappedValue
}
const values: number[] = []
seeds.forEach((seed, seedIndex) => {
    let value = seed
    // console.log('Seed: ', seed)
    mapLayers.forEach((layer, layerIndex) => {
        value = mapValueThroughLayer(value, layer)
        //        console.log(`  ${seedIndex}, ${layerIndex}: ${value}`)
    })
    values.push(value)
})

console.log(Math.min(...values))
