const genereateTemplate = options => {
    const { chain, smartContracts } = options;

    return `
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
};

export default genereateTemplate;
