// https://adventofcode.com/2022/day/3
import {loadInput, newLine, sum} from '../utils'

const input = loadInput(__dirname)
const newlineSplit = input.split(newLine)

const getPointValue = (char: string): number => {
    // on the utf table lowercase characters have HIGHER code points than upper case 🤷‍♂️
    const [lowerCaseSubtractor, upperCaseSubtractor] = [96, 38]

    const codePoint = char.charCodeAt(0)
    const subtractor =
        codePoint < lowerCaseSubtractor
            ? upperCaseSubtractor
            : lowerCaseSubtractor
    return codePoint - subtractor
}

const firstRoundItems: string[] = newlineSplit.map((line) => {
    const half = line.length / 2
    const [firstWord, secondWord] = [
        new Set(line.slice(0, half)),
        new Set(line.slice(half)),
    ]
    for (const char of secondWord) {
        if (firstWord.has(char)) return char
    }
})

const firstRoundTotal = firstRoundItems.map(getPointValue).reduce(sum)

// ----

const groupsOfThree: string[][] = []
for (let i = 0; i < newlineSplit.length; i += 3)
    groupsOfThree.push(newlineSplit.slice(i, i + 3))

const sortByLength: Set<string>[][] = groupsOfThree.map((arr) =>
    arr.map((s) => new Set(s)).sort((a, b) => b.size - a.size)
)

const secondRoundItems: string[] = sortByLength.map(
    ([firstWord, secondWord, thirdWord]) => {
        for (const char of firstWord) {
            if (secondWord.has(char) && thirdWord.has(char)) return char
        }
    }
)

const secondRoundTotal = secondRoundItems.map(getPointValue).reduce(sum)

console.log(firstRoundTotal, secondRoundTotal)
