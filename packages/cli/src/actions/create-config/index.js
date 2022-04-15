import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';

import {
    chainQuestions,
    abiQuestions,
    chainDataQuestions,
} from '../../questions';

import { check, validators } from '../../validators';

import genereateTemplate from './generate';

import constants from '../../contants';

const { CHAINS } = constants;

const mapChainKeyToChainData = async userChainKey => {
    let chainData;

    let answers;
    if (!userChainKey) {
        const questions = chainQuestions();
        answers = await inquirer.prompt(questions);
    }

    const chainKey = userChainKey || answers.chainKey;

    // if chain is custom, prompt for chain name and id
    chainData = CHAINS[chainKey];

    if (!chainData) {
        const questions = chainDataQuestions();
        chainData = await inquirer.prompt(questions);
    }

    return chainData;
};

const loadAbis = async abiPath => {
    const abis = [];

    if (abiPath === 'none') return abis;

    const relativePath = path.resolve(process.cwd(), abiPath);

    // prettier-ignore
    const abisInDir = 
        fs.readdirSync(relativePath)
        .filter(file => path.extname(file) === '.json');

    // compute abis
    abisInDir.map();
};

const createConfig = async options => {
    // 1. chain
    const chainData = await mapChainKeyToChainData(options.chain);

    // 2. abi directory
    let abiAnswers;
    {
        const questions = abiQuestions();
        abiAnswers = await inquirer.prompt(questions);

        if (abiAnswers.abiPath !== 'none')
            check(() => validators.validatePath(abiAnswers.abiPath));

        const abis = loadAbis(abiAnswers.abiPath);
    }

    const ops = {
        chain: chainData,
        abiPath: abiAnswers.abiPath,
    };

    const template = genereateTemplate(ops);

    // console.log(template);
};

export default createConfig;
