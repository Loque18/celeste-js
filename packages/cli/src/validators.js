import chalk from 'chalk';
import path from 'path';
import fs from 'fs';

const validators = {
    // validate_chain: chain => {
    //     if (!CHAINS[chain.toLowerCase()] && chain.toLowerCase() !== 'custom')
    //         throw new Error(`Chain "${chain}" is not supported`);
    // },
    validatePath: directory => {
        const absolutePath = path.resolve(__dirname, directory);
        if (!fs.existsSync(absolutePath))
            throw new Error(`Directory "${absolutePath}" does not exist`);
    },
};

function check(validatorFN) {
    try {
        validatorFN();
    } catch (e) {
        console.log('%s', chalk.red.bold(e.message));
        console.log('');
        console.log(e.stack);
        process.exit(1);
    }
}
