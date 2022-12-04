// https://adventofcode.com/2022/day/4
import {loadInput, newLine} from '../utils'

const input = loadInput(__dirname)
const splitInputs = input.split(newLine)

let total = 0
for (const line of splitInputs) {
    const [firstSet, secondSet] = line.split(',')
    const [[firstSetStart, firstSetEnd], [secondSetStart, secondSetEnd]] = [
        firstSet.split('-'),
        secondSet.split('-'),
    ]

    const [firstGroup, secondGroup] = [new Set<number>(), new Set<number>()]
    for (let i = +firstSetStart; i <= +firstSetEnd; ++i) firstGroup.add(i)
    for (let i = +secondSetStart; i <= +secondSetEnd; ++i) secondGroup.add(i)

    const isFirstGroupLonger = firstGroup.size > secondGroup.size
    const [longerGroup, shorterGroup] = [
        isFirstGroupLonger ? firstGroup : secondGroup,
        isFirstGroupLonger ? secondGroup : firstGroup,
    ]

    // let overlaps = true
    let overlaps = false
    for (const value of shorterGroup) {
        // if (!longerGroup.has(value)) {
        //     overlaps = false
        //     break
        // }

        if (longerGroup.has(value)) {
            overlaps = true
            break
        }
    }
    if (overlaps) ++total
}

console.log(total)
