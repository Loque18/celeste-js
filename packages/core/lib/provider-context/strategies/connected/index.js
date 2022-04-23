import Web3 from 'web3';
import WalletConnectProvider from '@walletconnect/web3-provider';

import IActionsStrategy from '../IActionsStrategy';

const getProvider = rpc => {
    const provider = new WalletConnectProvider({
        rpc: {
            [+rpc.chainId]: rpc.url,
        },
    });

    return provider;
};

const requestConnection = async provider => {
    try {
        await provider.enable();
    } catch (e) {
        throw new Error(e);
    }
};

const requestDisconnection = async provider => {
    await provider.disconnect();
};

const getConnection = async provider => {
    if (!provider.connector.connected) return null;
    await provider.enable();

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

function ConnectedActionsStrategy() {
    return {
        ...IActionsStrategy,
        getProvider,
        requestConnection,
        requestDisconnection,
        getConnection,
        events: {
            ...IActionsStrategy.events,
            ...events,
        },
    };
}

export default ConnectedActionsStrategy;
