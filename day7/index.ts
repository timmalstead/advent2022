// https://adventofcode.com/2022/day/7
import {loadInput, newLine, sum} from '../utils'
const input = loadInput(__dirname).split(newLine)

const [fileStructure, directorySizes] = [{'/': {}}, {'/': 0}]
let currentDir = "fileStructure['/']"

for (const line of input) {
    const isCommand = line.startsWith('$')
    if (isCommand) {
        if (line.includes('cd')) {
            const directory = line.split(' ').pop()

            if (directory === '/') continue
            else if (directory === '..') {
                const splitDirectories = currentDir.split('[')
                splitDirectories.pop()
                currentDir = splitDirectories.join('[')
            } else currentDir += `['${directory}']`
        } else if (line.includes('ls')) continue
    } else {
        if (line.startsWith('dir')) {
            const dirToCreate = line.split(' ').pop()
            const createDirectoryCommand = `${currentDir}['${dirToCreate}'] = {}`
            eval(createDirectoryCommand)
        } else {
            const [size, name] = line.split(' ')
            const sizeAsNumber = +size
            const createFileCommand = `${currentDir}['${name}'] = ${sizeAsNumber}`
            eval(createFileCommand)

            const strippedDir = currentDir
                .replace("fileStructure['", '')
                .replace(/\[\'/g, ',')
                .replace(/\'\]/g, '')

            let dirToUpdate = strippedDir
            while (dirToUpdate) {
                if (dirToUpdate in directorySizes)
                    directorySizes[dirToUpdate] += sizeAsNumber
                else directorySizes[dirToUpdate] = sizeAsNumber
                const dirAsArr = dirToUpdate.split(',')
                dirAsArr.pop()
                dirToUpdate = dirAsArr.join(',')
            }
        }
    }
}

const entries = Object.values(directorySizes)

const smallDirs = entries.filter((n) => n <= 100000)
// very tired when i wrote below callback and i will admit to copying it from https://github.com/leyanlo/advent-of-code/blob/581c079918284d88bdcb9aec5db4b7e889695f78/2022/day-07.js#L41
const largeDirs = entries.filter((n) => n >= directorySizes['/'] - 40000000)

const firstPartFinalSum = smallDirs.reduce(sum, 0)
const secondPartFinalSum = Math.min(...largeDirs)
console.log(firstPartFinalSum)
console.log(secondPartFinalSum)
