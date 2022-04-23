import Web3 from 'web3';
import IActionsStrategy from '../IActionsStrategy';

const getProvider = () => {
    const injected = window.ethereum;

    if (injected) return injected;

    throw new Error('No injected provider detected');
};

const requestConnection = async provider => {
    try {
        await provider.request({
            method: 'eth_requestAccounts',
        });
    } catch (e) {
        throw new Error(e);
    }
};

const requestDisconnection = async () => {};

const getConnection = async provider => {
    const web3 = new Web3(provider);

    const accounts = await web3.eth.getAccounts();

    if (accounts.length === 0) return null;

    return {
        accounts,
        web3,
    };
};

const events = {
    accountsChanged: accounts => {
        console.log('accountsChanged', accounts);
    },
    chainChanged: chainId => {
        console.log('chainChanged', chainId);
    },
    disconnected: args => {
        console.log('disconnected', args);
    },
};

function InjectedProviderStrategy() {
    return {
        ...IActionsStrategy,
        requestConnection,
        getProvider,
        getConnection,
        requestDisconnection,
        events: {
            ...IActionsStrategy.events,
            ...events,
        },
    };
}

export default InjectedProviderStrategy;
