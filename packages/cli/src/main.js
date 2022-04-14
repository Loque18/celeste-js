/* eslint-disable import/prefer-default-export */
import chalk from 'chalk';
import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';

const access = promisify(fs.access);
const copy = promisify(ncp);

async function copyTemplateFiles(options) {
    return copy(options.templateDirectory, options.targetDirectory, {
        clobber: false,
    });
}

async function createProject(op) {
    const options = {
        ...op,
        targetDirectory: op.targetDirectory || process.cwd(),
    };

    const templateDir = path.resolve(
        __dirname,
        '../templates',
        options.template.toLowerCase()
    );

    options.templateDirectory = templateDir;

    try {
        await access(templateDir, fs.constants.R_OK);
    } catch (err) {
        console.error('%s Invalid template name', chalk.red.bold('ERROR'));
        process.exit(1);
    }

    console.log(`Copy project files`);
    await copyTemplateFiles(options);

    console.log('%s Project ready', chalk.green.bold('SUCCESS'));
    return true;
}

export default createProject;
