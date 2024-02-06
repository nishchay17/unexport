#!/usr/bin/env node

const yargs = require('yargs');
const { init, start } = require('../build/index');

yargs
    .scriptName('unexport')
    .usage('$0 <cmd> [args]')
    .command({
        command: 'init',
        describe: 'Initialize config',
        handler: (argv) => {
            init();
        },
    })
    .option('packages', {
        describe: 'Include only installed packages',
        type: 'boolean',
    })
    .option('file', {
        describe: 'Include only file packages',
        type: 'boolean',
    })
    .command({
        command: 'go',
        describe: 'Run the unexport analysis',
        handler: (argv) => {
            if (!argv['packages'] && !argv['file']) {
                argv['packages'] = true;
                argv['file'] = true;
            }
            start(
                argv['packages'] || false,
                argv['file'] || false,
            );
        },
    })
    .demandCommand()
    .alias('h', 'help')
    .alias('v', 'version')
    .alias('i', 'init')
    .alias('p', 'packages')
    .alias('f', 'file')
    .help().argv;
