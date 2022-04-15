export const chainQuestions = () => {
    const questions = [];

    // remove repeated chains from CHAINS
    const choices = [
        'ethereum',
        'bsc',
        'bsc-testnet',
        'polygon',
        'harmony',
        'custom',
    ];

    questions.push({
        type: 'list',
        name: 'chainKey',
        message: 'Please select the target blockchain',
        choices,
    });

    return questions;
};

export const chainDataQuestions = () => {
    const questions = [];

    questions.push({
        type: 'input',
        name: 'name',
        message: 'Please enter the name of the chain',
        default: '',
    });

    questions.push({
        type: 'input',
        name: 'id',
        message: 'Please enter the id of the chain',
        default: '',
    });

    questions.push({
        type: 'input',
        name: 'url',
        message: 'Please enter the rpc url of the chain',
        default: '',
    });

    return questions;
};

export const abiQuestions = () => {
    const questions = [];

    questions.push({
        type: 'input',
        name: 'abiPath',
        message: "Enter folder directory to search for ABIs. (e.g. './abis')",
        default: 'none',
        // filter: directory => path.resolve(directory),
    });

    return questions;
};
