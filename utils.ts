import {readFileSync} from 'fs'

export const blankLine = /\n\n/
export const newLine = /\n/

export const loadInput = (path: string) =>
    readFileSync(`${path}/input.txt`).toString()
export const sum = (val: string | number, sum: string | number) =>
    Number(val) + Number(sum)
export const product = (a: number, b: number): number => a * b
export const asc = (a: number, b: number): number => a - b
export const strToNum = (str: string): number => Number(str)
