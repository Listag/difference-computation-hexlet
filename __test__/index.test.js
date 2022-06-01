import genDiff from "../src/index.js";
import { test, expect } from "@jest/globals";

test("is gendiff work correct with correct json data", () => {
  expect(genDiff("file1.json", "file2.json")).toEqual(
    `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`
  );
});

test("is gendiff work correct with correct yaml data", () => {
  expect(genDiff("filepath1.yml", "filepath2.yml")).toEqual(
    `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`
  );
});
