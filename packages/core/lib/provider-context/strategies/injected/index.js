import IActionsStrategy from '../IActionsStrategy';

const getProvider = () => {
    const injected = window.ethereum;

    if (injected) return injected;

    throw new Error('No injected provider detected');
};

const requestConnection = async provider => {
    try {
        provider.request({
            method: 'eth_requestAccounts',
        });
    } catch (e) {
        throw new Error(e);
    }
};

const requestDisconnection = async () => {};

function InjectedProviderStrategy() {
    return {
        ...IActionsStrategy,
        requestConnection,
        getProvider,
        // requestDisconnection,
    };
}

export default InjectedProviderStrategy;
