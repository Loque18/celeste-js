import inquirer from 'inquirer';

import { chainQuestions, abiQuestions } from '../questions';

import { check, validators } from '../validators';

const createConfig = async options => {
    // 1. check if chain was provided, if not ask details for it

    const ops = {};

    // 1. chain
    let chainAnswers;
    if (options.chain === 'custom' || !options.chain) {
        const questions = chainQuestions(options.chain);
        chainAnswers = await inquirer.prompt(questions);
    }

    ops.chain = options.chain || chainAnswers.chain;

    // 2. abi directory
    let abiAnswers;
    {
        const questions = abiQuestions();
        abiAnswers = await inquirer.prompt(questions);
        check(() => validators.validatePath(abiAnswers.abiDirectory));
    }

    ops.abiPath = abiAnswers.abisPath;

    // 1. check if targetBlockchain is valid
    // check(() => v.validate_chain(targetBlockchain));
    // console.log(targetBlockchain);
    // const questions = generateQuestions();
};

export default createConfig;
