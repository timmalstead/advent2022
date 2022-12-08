// https://adventofcode.com/2022/day/7
import {loadInput, newLine, sum} from '../utils'
const input = loadInput(__dirname).split(newLine)

type FileSizes = {'/': number; [dir: string]: number}
type DriveStructure = {'/': {[dir: string]: any}}

const moveUpOneDir = (str: string, delimiter: string): string =>
    str.slice(0, str.lastIndexOf(delimiter))

const createFileStructure = (input: string[]): DriveStructure => {
    const drive: DriveStructure = {'/': {}}
    let currentDir = "drive['/']"

    for (const line of input) {
        const isCommand = line.startsWith('$')
        if (isCommand) {
            const isDirCommand = line.includes('cd')
            if (isDirCommand) {
                const directory = line.split(' ').pop()
                const [isRoot, movingUpOneDir] = [
                    directory === '/',
                    directory === '..',
                ]
                const movingToLowerDir = !isRoot && !movingUpOneDir

                if (isRoot) continue
                else if (movingUpOneDir)
                    currentDir = moveUpOneDir(currentDir, '[')
                else if (movingToLowerDir) currentDir += `['${directory}']`
            }
        } else {
            const isDirOutput = line.startsWith('dir')
            if (isDirOutput) {
                const dirToCreate = line.split(' ').pop()
                const createDirectoryCommand = `${currentDir}['${dirToCreate}'] = {}`
                eval(createDirectoryCommand)
            } else {
                const [size, name] = line.split(' ')
                const createFileCommand = `${currentDir}['${name}'] = ${size}`
                eval(createFileCommand)
            }
        }
    }

    return drive
}

const indexFileSizes = (input: string[]): FileSizes => {
    const sizes: FileSizes = {'/': 0}
    let currentDir = '/'

    for (const line of input) {
        const isCommand = line.startsWith('$')
        if (isCommand) {
            const isChangingDirectory = line.includes('cd')
            if (isChangingDirectory) {
                const directory = line.split(' ').pop()
                const [isRoot, movingUpOneDir] = [
                    directory === '/',
                    directory === '..',
                ]
                const movingToLowerDir = !isRoot && !movingUpOneDir

                if (isRoot) continue
                else if (movingUpOneDir)
                    currentDir = moveUpOneDir(currentDir, ',')
                else if (movingToLowerDir) currentDir += `,${directory}`
            }
        } else {
            const isFile = !line.startsWith('dir')
            if (isFile) {
                const size = +line.split(' ').shift()

                let dirToUpdate = currentDir
                while (dirToUpdate) {
                    if (dirToUpdate in sizes) sizes[dirToUpdate] += size
                    else sizes[dirToUpdate] = size

                    dirToUpdate = moveUpOneDir(dirToUpdate, ',')
                }
            }
        }
    }

    return sizes
}

const indexSizes = indexFileSizes(input)
const values = Object.values(indexSizes)

const smallDirs = values.filter((n) => n <= 100000)
const largeDirs = values.filter((n) => n >= indexSizes['/'] - 40000000)

const firstPartFinalSum = smallDirs.reduce(sum, 0)
const secondPartFinalSum = Math.min(...largeDirs)
console.log(firstPartFinalSum)
console.log(secondPartFinalSum)
console.log(createFileStructure(input))
