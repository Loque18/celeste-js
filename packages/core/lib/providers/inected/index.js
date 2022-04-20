// const detectInjectedEthereum = () => {
//     const injected = window.ethereum;
//     if (injected) {
//         return injected;
//     }

//     return null;
// };

// const requestConection = async () => {
//     const injected = detectInjectedEthereum();

//     if (!injected) {
//         throw new Error('No injected ethereum found');
//     }

//     return web3;
// };

const getProvider = async () => {
    const injected = window.ethereum;

    if (injected) return injected;

    throw new Error('No injected provider detected');
};

const requestConection = async () => {
    ethereum.request({
        method: 'eth_requestAccounts',
    });
};

const requestDisconection = async () => {};

const InjectedProvider = {
    getProvider,
    requestConection,
    requestDisconection,
};
