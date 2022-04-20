const getInjectedProvider = async () => {
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

export default { getInjectedProvider, requestConection, requestDisconection };
