// https://adventofcode.com/2022/day/3
import {loadInput, newLine, sum} from '../utils'

const input = loadInput(__dirname)
const newlineSplit = input.split(newLine)

const isCharUpperCase = (point: number): boolean => point < 96
const getPointValue = (char: string): number => {
    const codePoint = char.charCodeAt(0)
    const subtractor = isCharUpperCase(codePoint) ? 38 : 96
    return codePoint - subtractor
}

const items: string[] = []

for (const line of newlineSplit) {
    const half = line.length / 2
    const [firstWord, secondWord] = [
        new Set(line.slice(0, half)),
        new Set(line.slice(half)),
    ]
    for (const char of secondWord) {
        if (firstWord.has(char)) {
            items.push(char)
            break
        }
    }
}

const total = items.map(getPointValue).reduce(sum)

// ----

const groupsOfThree: string[][] = []
for (let i = 0; i < newlineSplit.length; i += 3)
    groupsOfThree.push(newlineSplit.slice(i, i + 3))

const sortByLength = groupsOfThree.map((arr) =>
    arr.map((s) => new Set(s)).sort((a, b) => b.size - a.size)
)

const moreItems = sortByLength.map(([firstWord, secondWord, thirdWord]) => {
    for (const char of firstWord) {
        if (secondWord.has(char) && thirdWord.has(char)) return char
    }
})

const secondRoundTotal = moreItems.map(getPointValue).reduce(sum)

console.log(total, secondRoundTotal)
