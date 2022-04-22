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
    try {
        await provider.disconnect();
    } catch (e) {
        throw new Error(e);
    }
};

const getConnection = async provider => {
    console.log(provider.connector.connected);
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

function ConnectedActionsStrategy() {
    return {
        ...IActionsStrategy,
        getProvider,
        requestConnection,
        requestDisconnection,
        getConnection,
    };
}

export default ConnectedActionsStrategy;
