/* eslint no-console: 0 */

import chalk from 'chalk';
import path from 'path';
import fs from 'fs';

export const validators = {
    // validate_chain: chain => {
    //     if (!CHAINS[chain.toLowerCase()] && chain.toLowerCase() !== 'custom')
    //         throw new Error(`Chain "${chain}" is not supported`);
    // },
    validatePath: directory => {
        const relativePath = path.resolve(directory);
        if (!fs.existsSync(relativePath))
            throw new Error(`Directory "${relativePath}" does not exist`);
    },
};

export function check(validatorFN) {
    try {
        validatorFN();
    } catch (e) {
        console.log('%s', chalk.red.bold(e.message));
        console.log('');
        console.log(e.stack);
        process.exit(1);
    }
}
