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

const seedNumbers =
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
        if (dStart === sStart) {
            throw new Error(`dStart is equalt sStart: ${sStart}`)
        }
        mapLayers[mapLevel].push({ sStart, dStart, len })
    }
})

export const mapToNext = (
    value: number,
    { sStart, dStart, len }: map
): number => {
    if (value >= sStart && value < sStart + len) {
        return value + (dStart - sStart)
    }
    return value
}

const mapValueThroughLayer = (value: number, layer: map[]) => {
    let mappedValue = value
    //    console.log('    going to map: ', value)
    let mapped = false
    let mapIndex = 0
    while (mapIndex < layer.length) {
        const prevValue = mappedValue
        mappedValue = mapToNext(prevValue, layer[mapIndex])
        if (mappedValue !== prevValue) {
            // We did mapping, no need to check other maps
            break
        }
        mapIndex++
    }
    return mappedValue
}

const mapRange = (range: Range, map: map): Range[] => {
    // Så in kommer en range, och det finns en map. Ut kommer 1-3 ranges beroende på överlapp
    return []
}

const mapRangeThroughLayer = (range: Range, layer: map[]): Range[] => {
    let mapIndex = 0
    let resultingMaps: Range[] = []
    // For each map of the layer
    while (mapIndex < layer.length) {
        resultingMaps = [...resultingMaps, ...mapRange(range, layer[mapIndex])]
        mapIndex++
    }
    return resultingMaps
}

let minValue = Number.MAX_SAFE_INTEGER

type Range = [number, number]

export const getNewRanges = (candidate: Range, covered: Range): Range[] => {
    if (candidate[0] > covered[1]) {
        // Candidate range is right of coveredRange
        return [candidate]
    }
    if (candidate[1] < covered[0]) {
        // Candidate range is left of coveredRange
        return [candidate]
    }
    if (candidate[0] <= covered[0] && candidate[1] >= covered[1]) {
        // Candidate overlaps covered, return two ranges, before and after.
        return [
            [candidate[0], covered[0] - 1],
            [covered[1], candidate[1]],
        ]
    }
    if (candidate[0] >= covered[0] && candidate[1] <= covered[1]) {
        // candidate is covered by covered already
        return []
    }
    if (candidate[0] < covered[0] && candidate[1] > covered[0]) {
        // Candidate overlaps beginning of covered, but not end
        return [[candidate[0], covered[0]]]
    }
    if (candidate[0] < covered[1] && candidate[1] > covered[1]) {
        // candidate beginning overlaps covered, but not end
        return [[covered[1], candidate[1]]]
    }
    throw new Error(`Unexpected. ${candidate}, ${covered}`)
}

const deDupeRanges = (ranges: Range[]) =>
    ranges.filter(
        (range, index, self) =>
            index ===
            self.findIndex((r: Range) => r[0] === range[0] && r[1] === range[1])
    )

if (import.meta.main) {
    const coveredRanges: Range[] = []
    let numberIndex = 0
    while (numberIndex < seedNumbers.length) {
        const start = seedNumbers[numberIndex]
        const iterations = seedNumbers[numberIndex + 1]
        const candidate: Range = [start, start + iterations]

        const newRanges: Range[] = []

        if (coveredRanges.length === 0) {
            newRanges.push(candidate)
        } else {
            coveredRanges.forEach((cRange: Range) => {
                const partRanges: Range[] = getNewRanges(candidate, cRange)
                partRanges.forEach((p) => newRanges.push(p))
            })
        }
        console.log('Range: ', candidate)
        console.log('Resulted in: ', newRanges)
        const deDupedRanges = deDupeRanges(newRanges)
        console.log('Deduped: ', deDupedRanges)

        deDupedRanges.forEach((range) => {
            for (let seedNbr = range[0]; seedNbr < range[1]; seedNbr++) {
                let value = seedNbr
                mapLayers.forEach((layer, layerIndex) => {
                    value = mapValueThroughLayer(value, layer)
                })
                if (value < minValue) {
                    minValue = value
                }
            }
            coveredRanges.push(range)
        })
        console.log('Covered ranges: ', coveredRanges)
        numberIndex += 2
    }
    console.log(minValue)
}
