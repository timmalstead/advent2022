// https://adventofcode.com/2022/day/9
import {loadInput, newLine} from '../utils'
const input = loadInput(__dirname).split(newLine)

type Direction = 'U' | 'D' | 'L' | 'R'
interface CurrentPoint {
    x: number
    y: number
}

const [currentHead, currentTail, visited]: [
    CurrentPoint,
    CurrentPoint,
    Set<string>
] = [{x: 0, y: 0}, {x: 0, y: 0}, new Set<string>()]

visited.add('x: 0, y: 0')
for (const line of input) {
    const split = line.split(' ')
    const [direction, amount] = [split[0] as Direction, +split[1]]

    for (let i = 0; i < amount; ++i) {
        if (direction === 'U') ++currentHead.y
        else if (direction === 'D') --currentHead.y
        else if (direction === 'L') --currentHead.x
        else if (direction === 'R') ++currentHead.x

        if (currentHead.y === currentTail.y) {
            if (currentHead.x > currentTail.x) ++currentTail.x
            else --currentTail.x
        } else if (currentHead.x === currentTail.x) {
            if (currentHead.y > currentTail.y) ++currentTail.y
            else --currentTail.y
        } else if (
            currentHead.y !== currentTail.y &&
            currentHead.x !== currentTail.x
        )
            console.log('diaginol')

        const coordAsString = `x: ${currentTail.x}, y: ${currentTail.y}`
        visited.add(coordAsString)
    }
}

console.log(visited)
console.log(visited.size)
