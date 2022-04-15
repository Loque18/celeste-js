import constants from '../../contants';

const { CHAINS } = constants;

const genereateTemplate = options => {
    const { chain } = options;

    return `
module.exports = {
    rpc: {
        chainName: '${chain.name || ''}',
        chainId: '${chain.id || ''}',
        url: '${chain.url || ''}',
    },
    smartContracts: [],
    addressBook: {},
};
`;
};

export default genereateTemplate;
