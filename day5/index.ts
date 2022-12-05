// https://adventofcode.com/2022/day/5
import {loadInput, newLine, blankLine} from '../utils'

const input = loadInput(__dirname)
const [startingStacks, arrangeProcedure] = input.split(blankLine)
const isNotSpace = (str: string) => str !== ' '

const splitStack = startingStacks.split(newLine)
const stackHash: {[num: string]: string[]} = {}
const horizontalIndexes: number[] = []

const finalStackString = splitStack.pop()
for (let i = 0; i < finalStackString.length; ++i) {
    const char = finalStackString[i]
    if (isNotSpace(char)) {
        stackHash[char] = []
        horizontalIndexes.push(i)
    }
}

splitStack.reverse()
for (const line of splitStack)
    for (let i = 0; i < horizontalIndexes.length; ++i) {
        const [stackHashKey, charToPush] = [i + 1, line[horizontalIndexes[i]]]
        if (isNotSpace(charToPush)) stackHash[stackHashKey].push(charToPush)
    }

const splitArrangeProcedure = arrangeProcedure.split(newLine)

const strippedProcedure = splitArrangeProcedure.map((s) => {
    const startStrippedString = s.replace('move ', '')
    const [numberToMove, remainder] = startStrippedString.split(' from ')
    const [startingStack, destinationStack] = remainder.split(' to ')

    return [numberToMove, startingStack, destinationStack].map((s) => +s)
})

for (const [
    numberToMove,
    startingStack,
    destinationStack,
] of strippedProcedure) {
    stackHash[destinationStack].push(
        ...stackHash[startingStack].splice(-numberToMove, numberToMove)
    )

    // for (let i = 0; i < numberToMove; ++i)
    //     stackHash[destinationStack].push(stackHash[startingStack].pop())
}

const finalString = Object.values(stackHash).reduce(
    (str, arr) => (str += arr.pop()),
    ''
)

console.log(finalString)
