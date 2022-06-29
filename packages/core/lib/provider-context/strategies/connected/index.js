import WalletConnectProvider from '@walletconnect/web3-provider';

import IActionsStrategy from '../IActionsStrategy';

const getProvider = rpcs => {
    const rpcObject = {};

    rpcs.forEach(rpc => {
        const { chainId, url } = rpc;
        rpcObject[+chainId] = url;
    });

    const provider = new WalletConnectProvider({
        rpc: rpcObject,
    });

    return provider;
};

const requestConnection = async provider => {
    await provider.enable();
};

const requestDisconnection = async provider => {
    await provider.disconnect();
};

const requestChangeNetwork = async (provider, chainId) => {
    // eslint-disable-next-line no-console
    console.warn(`Please change to network ${chainId}`);
};

const getPreviousSession = async provider => {
    if (!provider.connector.connected) return null;
    await provider.enable();

    return provider;
};

function ConnectedActionsStrategy() {
    return {
        ...IActionsStrategy,
        getProvider,
        requestConnection,
        requestDisconnection,
        requestChangeNetwork,
        getPreviousSession,
    };
}

export default ConnectedActionsStrategy;
