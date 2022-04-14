import inquirer from 'inquirer';
import chalk from 'chalk';

import constants from '../contants';

// import generateQuestions from '../questions';

const { CHAINS } = constants;

const v = {
    // validate_chain: chain => {
    //     if (!CHAINS[chain.toLowerCase()] && chain.toLowerCase() !== 'custom')
    //         throw new Error(`Chain "${chain}" is not supported`);
    // },
    // directoryExists: directory => {
    //     const absolutePath = path.resolve(__dirname, directory);
    //     if (!fs.existsSync(absolutePath))
    //         throw new Error(`Directory "${absolutePath}" does not exist`);
    // },
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

const createConfig = options => {
    // 1. check if targetBlockchain is valid
    if (options.chain) check(() => v.validate_chain(options.chain));

    // check(() => v.validate_chain(targetBlockchain));
    // console.log(targetBlockchain);
    // const questions = generateQuestions();
    // const answers = inquirer.prompt(questions);
};

export default createConfig;
