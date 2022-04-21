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

function ConnectedActionsStrategy() {
    return {
        ...IActionsStrategy,
        getProvider,
        requestConnection,
        requestDisconnection,
    };
}

export default ConnectedActionsStrategy;
