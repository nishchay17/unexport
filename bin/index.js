#!/usr/bin/env node

const yargs = require('yargs');
const { init, start } = require('../build/index');

yargs
    .scriptName('unexport')
    .usage('$0 <cmd> [args]')
    .command({
        command: 'init',
        describe: 'Initialize config',
        handler: () => {
            init();
        },
    })
    .command({
        command: 'go',
        describe: 'Run the unexport analysis',
        handler: () => {
            start();
        },
    })
    .demandCommand()
    .alias('h', 'help')
    .alias('v', 'version')
    .alias('i', 'init')
    .help().argv;
