import path from "path";
import fs from "fs";
import _ from "lodash";
import process from "node:process";
import parse from "./parsers.js";

const getContent = (fileName) => {
  const fullPath = path.resolve(process.cwd(), "__fixtures__", fileName);
  const content = fs.readFileSync(fullPath, "utf-8");
  const format = path.extname(fileName).slice(1);

  return parse(content, format);
};

const formDiff = (firstFileContent, secondFileContent) => {
  const firstFileKeys = Object.keys(firstFileContent);
  const secondFileKeys = Object.keys(secondFileContent);
  const mergeKeys = _.sortBy(_.union(firstFileKeys, secondFileKeys));

  // Отсутствие плюса или минуса говорит, что ключ есть в обоих файлах, и его значения совпадают.
  // Во всех остальных ситуациях значение по ключу либо отличается, либо ключ есть только в одном файле.
  // Минус отвечает за первый файл, плюс - за второй

  const diff = mergeKeys.reduce((acc, key) => {
    if (_.has(firstFileContent, key) && _.has(secondFileContent, key)) {
      if (firstFileContent[key] === secondFileContent[key]) {
        return `${acc}    ${key}: ${firstFileContent[key]}\n`;
      }
      return `${acc}  - ${key}: ${firstFileContent[key]}\n  + ${key}: ${secondFileContent[key]}\n`;
    }
    if (_.has(firstFileContent, key) && !_.has(secondFileContent, key)) {
      return `${acc}  - ${key}: ${firstFileContent[key]}\n`;
    }
    if (!_.has(firstFileContent, key) && _.has(secondFileContent, key)) {
      return `${acc}  + ${key}: ${secondFileContent[key]}\n`;
    }
    return acc;
  }, "");
  return `{\n${diff}}`;
};

const genDiff = (filePath1, filePath2) => {
  const firstFileContent = getContent(filePath1);
  const secondFileContent = getContent(filePath2);

  const diff = formDiff(firstFileContent, secondFileContent);
  return diff;
};

export default genDiff;
