import Web3 from 'web3';
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

// const requestDisconnection = async () => {};

const getConnection = async provider => {
    const web3 = new Web3(provider);

    const accounts = await web3.eth.getAccounts();

    if (accounts.length === 0) return null;

    return {
        accounts,
        web3,
    };
};

function InjectedProviderStrategy() {
    return {
        ...IActionsStrategy,
        requestConnection,
        getProvider,
        getConnection,
        // requestDisconnection,
    };
}

export default InjectedProviderStrategy;
