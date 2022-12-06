// https://adventofcode.com/2022/day/6
import {loadInput} from '../utils'
const input = loadInput(__dirname)

const findMarkerStart = (
    searchStr: string,
    targetMarkerSize: number
): number => {
    let startOfMarker = -1

    for (let i = 0; i <= searchStr.length - targetMarkerSize; ++i) {
        const strSlice = new Set(searchStr.slice(i, i + targetMarkerSize))

        if (strSlice.size === targetMarkerSize) {
            startOfMarker = i + targetMarkerSize
            break
        }
    }

    return startOfMarker
}

console.log(findMarkerStart(input, 4))
console.log(findMarkerStart(input, 14))
