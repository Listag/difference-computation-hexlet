#!/usr/bin/env node
import { Command } from 'commander';

const program = new Command();
program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .action(function(filepath1, filepath2) {
    const diff = genDiff(filepath1, filepath2);
    console.log(diff);
  });

program.parse();