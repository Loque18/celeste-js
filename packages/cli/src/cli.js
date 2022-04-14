/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
import arg from 'arg';
import inquirer from 'inquirer';

// import { createProject } from './main';
import createTemplate from './main';

function parseArgumentsIntoOptions(rawArgs) {
    const args = arg(
        {
            '--git': Boolean,
            '--yes': Boolean,
            '--install': Boolean,
        },
        {
            argv: rawArgs.slice(2),
        }
    );

    return {
        skipPromts: args['--yes'] || false,
        git: args['--git'] || false,
        template: args._[0],
        runInstall: args['--install'] || false,
    };
}

async function promptForMissingOptions(options) {
    const defaultTemplate = 'Javascript';

    if (options.skipPromts) {
        return {
            ...options,
            template: options.template || defaultTemplate,
        };
    }

    const questions = [];

    if (!options.template) {
        questions.push({
            type: 'list',
            name: 'template',
            message: 'Which template would you like to use?',
            choices: ['Javascript', 'TypeScript'],
        });
    }
    if (!options.git) {
        questions.push({
            type: 'confirm',
            name: 'git',
            message: 'Initialize a git repository?',
            default: false,
        });
    }

    const answers = await inquirer.prompt(questions);

    return {
        ...options,
        template: options.template || answers.template,
        git: options.git || answers.git,
    };
}

export async function cli(args) {
    let options = parseArgumentsIntoOptions(args);
    options = await promptForMissingOptions(options);
    await createTemplate(options);

    // console.log(options);
}
