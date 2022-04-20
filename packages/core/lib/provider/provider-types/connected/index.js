import WalletConnectProvider from '@walletconnect/web3-provider';

const getConnectedProvider = rpc => {
    const provider = new WalletConnectProvider({
        rpc: {
            [rpc.chainName]: rpc.url,
        },
    });
    return provider;
};

export default getConnectedProvider;
