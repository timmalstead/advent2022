// https://adventofcode.com/2022/day/1
import { loadInput, sum, asc, blankLine, newLine } from "../utils"

const practiceInput: string = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`

const input = loadInput(__dirname)

const splitOnBlankLine = input.split(blankLine)
const splitOnNewLine = splitOnBlankLine.map((arr) => arr.split(newLine))
const sums = splitOnNewLine.map((arr) => arr.reduce(sum, 0))
const sortedSums = [...sums].sort(asc)
const { length } = sortedSums

const largest = sortedSums[length - 1]
const topThreeSum = sortedSums.slice(length - 3).reduce(sum)

console.log(topThreeSum)
