import WalletConnectProvider from '@walletconnect/web3-provider';

import IProvider from '../interface';

//  Create WalletConnect Provider

const getConnectedProvider = rpc => {
    const provider = new WalletConnectProvider({
        rpc: {
            [rpc.chainName]: rpc.url,
        },
    });
    return provider;
};

const requestConection = async () => {
    await provider.enable();
};

const ConnectedProvider = {
    ...IProvider,
    getProvider,
    requestConection,
};

const AbstractProviderFactory = {
    create: () => {
        throw new Error('Not implemented');
    },
};

const ConnectedProviderFactory = function () {
    return {
        ...AbstractProviderFactory,
        create: rpc => getConnectedProvider(rpc),
    };
};

const InjectedProviderFactory = function () {
    return {
        ...AbstractProviderFactory,
        create: () => getInjectedProvider(),
    };
};

const onConnect = async ({ type }) => {
    let providerFactory;

    if (type === 'injected') {
        providerFactory = InjectedProviderFactory();
    } else if (type === 'walletconnect') {
        providerFactory = ConnectedProviderFactory();
    } else throw new Error('Invalid provider type');

    const provider = await providerFactory.create();

    const web3 = new Web3(provider);
};
