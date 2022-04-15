import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import chalk from 'chalk';

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

const mapAbisToImportStatements = (abis, localPath) => {
    const importStatements = abis.map(abi => {
        const name = abi.replace(/.json/gi, '');

        return `const ${name} = require('${localPath}/${abi}');`;
    });

    return importStatements;
};

const mapAbistoSmartContracts = async abiPath => {
    if (abiPath === 'none') return { abis: '[]', importStatements: [] };

    const relativePath = path.resolve(process.cwd(), abiPath);

    // prettier-ignore
    const abisInDir = 
        fs.readdirSync(relativePath)
        .filter(file => path.extname(file).toLocaleLowerCase() === '.json');

    // prettier-ignore
    const abis = abisInDir.map(abi =>        
        `{key: "${abi.toUpperCase().replace(/.json/gi, '')}", abi: ${abi.replace(/.json/gi, '')}, address: ''}`
    );

    const abisArray = `[${abis.join(',')}]`;

    return {
        abis: abisArray,
        importStatements: mapAbisToImportStatements(abisInDir, abiPath),
    };
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
    }

    const { abis: smartContracts, importStatements } =
        await mapAbistoSmartContracts(abiAnswers.abiPath);

    const ops = {
        chain: chainData,
        smartContracts,
        importStatements,
    };

    // console.log('options', ops);

    try {
        genereateTemplate(ops);
        console.log(
            '%s celeste.config.js',
            chalk.green('✔ configuration file generated successfully')
        );
    } catch (err) {
        console.log('%s', chalk.red('✘ configuration file generation failed'));
        console.log(err);
    }
};

export default createConfig;
