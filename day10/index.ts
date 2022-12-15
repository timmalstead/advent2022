// https://adventofcode.com/2022/day/9
import {loadInput, newLine} from '../utils'
const input = loadInput(__dirname).split(newLine)

// first cycle begins, there is no delay, noop is popped off the stack, delay is set to 1, the delay is then set to zero, the value to assign is false so it ends
// second cycle begins, there is no delay and it is not a noop so a number is popped off the stack, there is no value to assign so the popped value is set to be that value to be assigned after 2 rounds, the delay is set to 2, then the delay is decremented by 1
// third cycle begins, the delay is one, so we do not enter the larger block of logic, it is then decremented by 1, as there is no longer a delay and the valueToAssign is a number, x gets 3 added to 1, x is now 4
//
const intervalsToReport = new Set<number>([20, 60, 100, 140, 180, 220])

let [valueToAssign, delay, x, i]: [number | false, number, number, number] = [
    false,
    0,
    1,
    1,
]
let finalSum = 0
while (input.length) {
    if (!delay) {
        const command = input.shift()
        if (command === 'noop') delay = 1
        else {
            if (valueToAssign === false) {
                const addvalueToAssignToX = +command.split(' ')[1]
                valueToAssign = addvalueToAssignToX
                delay = 2
            }
        }
    }
    --delay
    if ((!delay || !input.length) && valueToAssign !== false) {
        x += valueToAssign
        valueToAssign = false
    }

    if (i === 220 && intervalsToReport.has(i)) finalSum += (i - 1) * x
    else if (intervalsToReport.has(i)) finalSum += i * x

    ++i
}

console.log(finalSum)
