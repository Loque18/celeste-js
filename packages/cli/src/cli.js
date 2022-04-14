import { program, Option } from 'commander';

import * as actions from './actions';

import constants from './contants';
const { CHAINS } = constants;

console.log(Array.from(Object.keys(CHAINS)).push('custom'));

export function cli(argv) {
    // create config command
    program
        .name('celesteJS cli')
        .description('CLI to bootstrap celeste projects')
        .version('1.0.0');

    program
        .command('create-config')
        .description('Create a celeste.config.js file')
        .addOption(
            new Option(
                '-c, --chain <chain>',
                'The target blockchain',
                CHAINS
            ).choices(Object.keys(CHAINS).push('custom'))
        )
        .option('-y, --yes', 'Skip prompts')
        .action(actions.createConfig);

    program.parse();

    // program.option('--first').option('-s, --separator <char>');

    // program.parse();

    // const options = program.opts();
    // const limit = options.first ? 1 : undefined;
    // console.log(program.args[0].split(options.separator, limit));
}

export const asd = 'asd';
