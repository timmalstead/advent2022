// https://adventofcode.com/2022/day/5
import {loadInput, newLine, blankLine, strToNum} from '../utils'

const input = loadInput(__dirname)
const [startingStacks, procedureLines] = input.split(blankLine)
const isNotSpace = (str: string) => str !== ' '

const splitStartingStacks = startingStacks.split(newLine)

type CrateHash = {[num: string]: string[]}
const [stackHash, crateIndices]: [CrateHash, number[]] = [{}, []]

const lastStackLine = splitStartingStacks.pop()
for (let i = 0; i < lastStackLine.length; ++i) {
    const char = lastStackLine[i]
    if (isNotSpace(char)) {
        stackHash[char] = []
        crateIndices.push(i)
    }
}

for (const line of splitStartingStacks)
    for (let i = 0; i < crateIndices.length; ++i) {
        const [stackHashKey, charToInsert] = [i + 1, line[crateIndices[i]]]
        if (isNotSpace(charToInsert))
            stackHash[stackHashKey].unshift(charToInsert)
    }

const splitProcedureLines = procedureLines.split(newLine)

const strippedProcedures = splitProcedureLines.map((s) => {
    const cleanedString = s.replace('move ', '').replace(/ from | to /g, ',')
    const proceduresAsNumbers = cleanedString.split(',').map(strToNum)
    return proceduresAsNumbers
})

for (const [
    numberToMove,
    startingStack,
    destinationStack,
] of strippedProcedures) {
    // for (let i = 0; i < numberToMove; ++i) {
    //     const singleCrateToMove = stackHash[startingStack].pop()
    //     stackHash[destinationStack].push(singleCrateToMove)
    // }

    const [numberToSplice, numberToDelete] = [-numberToMove, numberToMove]
    const splicedCrates = stackHash[startingStack].splice(
        numberToSplice,
        numberToDelete
    )
    stackHash[destinationStack].push(...splicedCrates)
}

const finalString = Object.values(stackHash).reduce(
    (str, arr) => (str += arr.pop()),
    ''
)

console.log(finalString)
