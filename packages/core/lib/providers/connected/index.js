import WalletConnectProvider from '@walletconnect/web3-provider';

const getConnectedProvider = rpc => {
    const provider = new WalletConnectProvider({
        rpc: {
            [rpc.chainName]: rpc.url,
        },
    });
    return provider;
};

const requestConection = async provider => {
    await provider.enable();
};

const requestDisconnection = async provider => {
    await provider.disconnect();
};

export { getConnectedProvider, requestConection, requestDisconnection };

// /* eslint-disable no-unused-vars */
// const IProviderMethods = {
//     requestConection: async () => new Error('Not implemented'),
//     requestDisconnection: async () => new Error('Not implemented'),
// };

// const getProviderMethods = provider => {
//     return {
//         ...IProviderMethods,
//     };
// };

// const ConnectedProviderMethodsFactory = provider => {};

// export default {
//     getConnectedProvider,
// };

// // const onConnect = async ({ type }) => {
// //     let providerFactory;

// //     if (type === 'injected') {
// //         providerFactory = InjectedProviderFactory();
// //     } else if (type === 'walletconnect') {
// //         providerFactory = ConnectedProviderFactory();
// //     } else throw new Error('Invalid provider type');

// //     const provider = await providerFactory.create();

// //     const web3 = new Web3(provider);
// // };
