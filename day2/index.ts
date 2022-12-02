// https://adventofcode.com/2022/day/2
import { loadInput, newLine } from "../utils"

const input = loadInput(__dirname)
const newlineSplit = input.split(newLine)

// A X rock 1 point
// B Y paper 2 points
// C Z scissors 3 points

// win 6 points, draw 3 points, lose 0 points

const firstRoundValues: { [combination: string]: number } = {
    "A X": 4,
    "A Y": 8,
    "A Z": 3,
    "B X": 1,
    "B Y": 5,
    "B Z": 9,
    "C X": 7,
    "C Y": 2,
    "C Z": 6,
}

const firstTotal = newlineSplit.reduce((sum, combination) => (firstRoundValues[combination] + Number(sum)), 0)

// X lose, Y draw, Z win

const secondRoundValues: { [combination: string]: number } = {
    "A X": 3,
    "A Y": 4,
    "A Z": 8,
    "B X": 1,
    "B Y": 5,
    "B Z": 9,
    "C X": 2,
    "C Y": 6,
    "C Z": 7,
}

const secondTotal = newlineSplit.reduce((sum, combination) => (secondRoundValues[combination] + Number(sum)), 0)

console.log(firstTotal, secondTotal)
