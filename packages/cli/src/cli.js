/* eslint-disable import/prefer-default-export */
import { program, Option } from 'commander';

import * as actions from './actions';
import constants from './constants';

const { CHAINS } = constants;

export function cli() {
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
            ).choices([...Object.keys(CHAINS), 'custom'])
        )
        .option('-y, --skipPromps', 'Skip prompts')
        .action(actions.createConfig);

    program.parse();
}
