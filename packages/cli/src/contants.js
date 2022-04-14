const eth = {
    name: 'Ethereum',
    id: 1,
    url: 'url',
};

const hmny = {
    name: 'Harmony',
    id: 2,
    url: 'url',
};

const bsc = {
    name: 'Binance Smart Chain',
    id: 57,
    url: 'url',
};

const bsct = {
    name: 'Binance Smart Chain Testnet',
    id: 97,
    url: 'url',
};

const pol = {
    name: 'Polygon',
    id: 3,
    url: 'url',
};

const CHAINS = {
    eth,
    ethereum: { ...eth },

    bsc,
    'bsc-testnet': { ...bsct },

    pol,
    polygon: { ...pol },

    hmny,
    harmony: { ...hmny },
};

const constants = {
    CHAINS,
};

Object.seal(constants);

export default constants;
