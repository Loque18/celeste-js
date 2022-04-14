import { asd } from './cli';
import constants from './contants';

const { CHAINS } = constants;

export const chainQuestions = OpChain => {
    const questions = [];

    // remove repeated chains from CHAINS
    const permittedChains = [
        'ethereum',
        'bsc',
        'bsc-testnet',
        'polygon',
        'harmony',
    ];
    const chains = Object.keys(CHAINS).filter(chain =>
        permittedChains.includes(chain)
    );

    if (!OpChain) {
        questions.push({
            type: 'list',
            name: 'chain',
            message: 'Please select the target blockchain',
            choices: [...chains, 'custom'],
        });

        // if chain is custom, prompt for chain name and id
        questions.push({
            type: 'input',
            name: 'chainName',
            message: 'Please enter the name of the chain',
            default: null,
            when: answers => answers.chain === 'custom',
        });

        questions.push({
            type: 'input',
            name: 'chainId',
            message: 'Please enter the id of the chain',
            default: null,
            when: answers => answers.chain === 'custom',
        });

        questions.push({
            type: 'input',
            name: 'chainUrl',
            message: 'Please enter the rpc url of the chain',
            default: null,
            when: answers => answers.chain === 'custom',
        });
    } else if (OpChain === 'custom') {
        questions.push({
            type: 'input',
            name: 'chainName',
            message: "What is the chain's name?",
            default: null,
        });

        questions.push({
            type: 'input',
            name: 'chainId',
            message: "What is the chain's id chain?",
            default: null,
        });

        questions.push({
            type: 'input',
            name: 'chainUrl',
            message: "What is the chain's rpc-url ?",
            default: null,
        });
    }

    return questions;
};

export const abiQuestions = opAbi => {
    const questions = [];

    questions.push({
        type: 'input',
        name: 'abisPath',
        message: "Enter folder directory to search for ABIs. (e.g. './abis')",
        default: '',
    });

    return questions;
};
