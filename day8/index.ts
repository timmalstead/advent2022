// https://adventofcode.com/2022/day/8
import {loadInput, newLine, strToNum} from '../utils'
const input = loadInput(__dirname).split(newLine)

// 0 - lowest, 9 highest
// A tree is visible if all of the other trees between it and an edge of the grid are shorter than it. Only consider trees in the same row or column; that is, only look up, down, left, or right from any given tree.
// All of the trees around the edge of the grid are visible
// Consider your map; how many trees are visible from outside the grid?

const [length, width] = [input.length, input[0].length]
const [topAndBottom, leftAndRight] = [
    new Set<number>([0, length - 1]),
    new Set<number>([0, width - 1]),
]

const isVisible = (treeToCheck: number, treesInLine: string): boolean => {
    const splitTrees = treesInLine.split('').map(strToNum)
    return treeToCheck > Math.max(...splitTrees)
}

let visibleTrees = 0
for (let y = 0; y < length; ++y) {
    if (topAndBottom.has(y)) visibleTrees += width
    else
        for (let x = 0; x < width; ++x) {
            if (leftAndRight.has(x)) ++visibleTrees
            else {
                const currentTree = +input[y][x]
                const widthLine = input[y]

                const sliceToLeft = widthLine.slice(0, x)
                const visibleFromLeft = isVisible(currentTree, sliceToLeft)
                if (visibleFromLeft) ++visibleTrees
                else {
                    const sliceToRight = widthLine.slice(x + 1)
                    const visibleFromRight = isVisible(
                        currentTree,
                        sliceToRight
                    )
                    if (visibleFromRight) ++visibleTrees
                    else {
                        let sliceToTop = ''
                        for (let i = 0; i < y; ++i) sliceToTop += input[i][x]
                        const visibleFromTop = isVisible(
                            currentTree,
                            sliceToTop
                        )
                        if (visibleFromTop) ++visibleTrees
                        else {
                            let sliceToBottom = ''
                            for (let i = y + 1; i < length; ++i)
                                sliceToBottom += input[i][x]
                            const visibleFromBottom = isVisible(
                                currentTree,
                                sliceToBottom
                            )
                            if (visibleFromBottom) ++visibleTrees
                        }
                    }
                }
            }
        }
}

console.log(visibleTrees)
