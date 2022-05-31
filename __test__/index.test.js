import path from "path";
import process from 'node:process';
import genDiff from "../src/index.js";
import { test, expect } from '@jest/globals'

const pathToFile1 = path.resolve(process.cwd(), "__fixtures__", 'file1.json');
const pathToFile2 = path.resolve(process.cwd(), "__fixtures__", 'file2.json');

test('is gendiff work correct with correct data', () => {
    expect(genDiff(pathToFile1, pathToFile2)).toEqual(
`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`
)});