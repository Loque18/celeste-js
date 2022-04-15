import fs from 'fs';
import prettier from 'prettier';

const genereateTemplate = options => {
    const { chain, smartContracts, importStatements } = options;

    const template = `
${importStatements.join('\n')}

module.exports = {
    rpc: {
        chainName: '${chain.name || ''}',
        chainId: '${chain.id || ''}',
        url: '${chain.url || ''}',
    },
    smartContracts: ${smartContracts},
    addressBook: {},
};
`;

    // prettier template
    const formattedTemplate = prettier.format(template, {
        parser: 'babel',
        trailingComma: 'es5',
        tabWidth: 4,
        semi: true,
        singleQuote: true,
        arrowParens: 'avoid',
    });

    // access(process.cwd(), fs.constants.W_OK, err => {

    fs.writeFileSync(`${process.cwd()}/celeste.config.js`, formattedTemplate);
};

export default genereateTemplate;
