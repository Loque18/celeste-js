const generateQuestions = options => {

    const questions = [];
    
    questions.push({
        type: 'list',
        name: 'chain',
        message: 'In which blockchain will operate the app ?',
        choices: ['Ethereum', 'Harmony', 'Custom'],
    });

        // if chain is custom, prompt for chain name and id

        questions.push({
            type: 'input',
            name: 'chainName',
            message: "What is the chain's name?",
            default: null,
            when: answers => answers.chain === 'Custom',
        });

        questions.push({
            type: 'input',
            name: 'chainId',
            message: "What is the chain's id chain?",
            default: null,
            when: answers => answers.chain === 'Custom',
        });

        questions.push({
            type: 'input',
            name: 'chainUrl',
            message: "What is the chain's rpc-url ?",
            default: null,
            when: answers => answers.chain === 'Custom',
        });
    } else if (options.chain === 'Custom') {
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

    questions.push({
        type: 'input',
        name: 'abisPath',
        message: 'Enter ABIs folder directory url. example: ./src/abis',
        default: '',
    });

    return questions;
};

export default generateQuestions;
