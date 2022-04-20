// eslint-disable-next-line no-unused-vars
const getInjectedProvider = rpc => {
    const injected = window.ethereum;

    if (injected) return injected;

    throw new Error('No injected provider detected');
};

const requestConection = async provider => {
    provider.request({
        method: 'eth_requestAccounts',
    });
};

const requestDisconection = async () => {};

export { getInjectedProvider, requestConection, requestDisconection };
