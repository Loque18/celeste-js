const eth = {
    name: 'Ethereum',
    id: 1,
    url: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
};

const hmny = {
    name: 'Harmony',
    id: 1666600000,
    url: 'https://api.harmony.one',
};

const bsc = {
    name: 'Binance Smart Chain',
    id: 56,
    url: 'https://bsc-dataseed.binance.org/',
};

const bsct = {
    name: 'Binance Smart Chain Testnet',
    id: 97,
    url: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
};

const pol = {
    name: 'Matic Mainnet',
    id: 137,
    url: 'https://rpc-mainnet.maticvigil.com/',
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
