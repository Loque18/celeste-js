const getInjectedProvider = () => {
    const injected = window.ethereum;

    if (injected) return injected;

    throw new Error('No injected provider detected');
};

export default getInjectedProvider;
