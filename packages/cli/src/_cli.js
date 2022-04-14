/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
import arg from 'arg';
import inquirer from 'inquirer';
import chalk from 'chalk';

import path from 'path';
import fs from 'fs';

// import { createProject } from './main';
// import createTemplate from './main';

import generateBaseConfig from './base';

import generateQuestions from './questions';

import constants from './contants';

const { chains } = constants;

const validators = {
    chain: chain => {
        if (chain && !chains[chain] && chain !== 'Custom')
            throw new Error(`Chain "${chain}" is not supported`);
    },
    directoryExists: directory => {
        const absolutePath = path.resolve(__dirname, directory);

        if (!fs.existsSync(absolutePath))
            throw new Error(`Directory "${absolutePath}" does not exist`);
    },
};

function check(validator) {
    try {
        validator();
    } catch (e) {
        console.log('%s', chalk.red.bold(e.message));
        console.log('');
        console.log(e.stack);
        process.exit(1);
    }
}

function parseArgumentsIntoOptions(rawArgs) {
    const args = arg(
        {
            //     '--yes': Boolean,
            //     '-y': '--yes',
        },
        {
            argv: rawArgs.slice(2),
        }
    );

    return {
        // skipPromts: args['--yes'] || false,
        command: args._[0],
        // commandArgs: args._.slice(1),
        // git: args['--git'] || false,
        // abiurl: args._[1] || '',
        // runInstall: args['--install'] || false,
    };
}

async function promptForMissingOptions(options) {
    const defaultChain = 'Ethereum';

    if (options.skipPromts) {
        return {
            ...options,
            chain: options.chain || defaultChain,
        };
    }

    const questions = generateQuestions(options);

    const answers = await inquirer.prompt(questions);

    const chainConfig = {
        name: answers.chainName,
        id: answers.chainId,
        url: answers.chainUrl,
    };

    const chain = options.chain || answers.chain;

    const res = {
        ...options,
        chain,
        abisPath: answers.abisPath,
        chainConfig: chain === 'Custom' ? chainConfig : chains[chain],
    };

    return res;
}

export async function cli(args) {
    // 1. parse args into options
    const options = parseArgumentsIntoOptions(args);

    console.log(options);

    // // 2. check validity of chain
    // check(() => validators.chain(options.chain));

    // // 3. ask the user for any missing options
    // const newoptions = await promptForMissingOptions(options);

    // check(() => validators.directoryExists(newoptions.abisPath));

    // // await createTemplate(options);

    // // const config = generateBaseConfig(
    // //     {
    // //         key: options.chain,
    // //         config: options.chainConfig,
    // //     },
    // //     options.abiurl
    // // );

    // console.log(newoptions);

    // console.log(options);
}
