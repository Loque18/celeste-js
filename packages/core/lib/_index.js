// /* eslint-disable no-plusplus */
// /* eslint-disable lines-between-class-members */

// import { store as celesteStore, actions } from '@celeste-js/store';
// import Web3 from 'web3';

// import ProviderProxy from './provider-proxy';
// import { providers, events } from './constants';

// import {
//     validateConfig,
//     validateProviderType,
//     validateIfLoggedIn,
// } from './validators';

// const { set_readonly_initialized, add_web3_readonly_instance } = actions;

// class CelesteJS {
//     #config;
//     #providerProxy;
//     #events = {};
//     #internalEvents = {};

//     configread;

//     constructor(config) {
//         // 1. store config
//         validateConfig(config);
//         this.#config = config;
//         this.configread = config;

//         const { rpcs, smartContracts, isMultichain, addressBook } = config;

//         // only read
//         // 2. create static web3 for each rpc instance and init read smart contracts

//         Object.values(rpcs).forEach(rpc => {
//             const web3 = new Web3(rpc.url);

//             // prettier-ignore
//             celesteStore.dispatch(add_web3_readonly_instance(rpc.chainId, web3));

//             // 3. create proxies for each smart contract provided across all rpc instances
//             smartContracts.forEach(sc => {
//                 // 3.1. get address for this chain
//                 const address = isMultichain
//                     ? addressBook?.[sc.key]?.[rpc.chainId]
//                     : addressBook[sc.key];

//                 if (address === undefined) return;

//                 // 3.2. check if chain is listed in rpc config
//                 // prettier-ignore
//                 if (!Object.values(rpcs).map(_rpc => _rpc.chainId).includes(rpc.chainId)) {
//                     // eslint-disable-next-line no-console
//                     console.warn(
//                         `CelesteJS: config error - chain with id ${rpc.chainId}, provided on element addressBook.${sc.key}, is not listen in rpcs.`
//                     );
//                     return;
//                 }

//                 // 3.3. get sc factory instance for this chain using chainId
//                 initSC(address, sc, web3, `_READ.${rpc.chainId}`);
//             });
//         });

//         celesteStore.dispatch(set_readonly_initialized(true));

//         // write

//         // 4. instantiate provider proxy
//         this.#providerProxy = new ProviderProxy(Object.values(rpcs));

//         // 5. check if wallet is connected

//         (async () => {
//             const listOfProviders = [providers.INJECTED, providers.CONNECTED];

//             const sessions = await Promise.all(
//                 listOfProviders.map(async providerType => {
//                     this.#providerProxy.setType(providerType);
//                     const provider =
//                         await this.#providerProxy.getPreviousSession(
//                             providerType
//                         );

//                     return {
//                         providerType,
//                         provider,
//                     };
//                 })
//             );

//             const s = sessions.find(session => session.provider !== null);

//             if (s) {
//                 await initWriteWeb3(s.providerType, s.provider);
//             }

//             // try to get previous session, and stop once is a session is found
//             // for (let i = 0; i < listOfProviders.length; i++) {
//             //     const provider = listOfProviders[i];

//             //     this.#providerProxy.setType(provider);
//             //     const previousSessionProvider =
//             //         await this.#providerProxy.getPreviousSession();

//             //     console.log(previousSessionProvider);
//             // }
//         })();

//         // 6. sail this object to avoid object mutation
//     }

//     /* *~~*~~*~~*~~*~~* Public API *~~*~~*~~*~~*~~* */
//     async requestConnection(providerType) {
//         validateProviderType(providerType);
//         // if user is already logged in, do nothing
//         if (validateIfLoggedIn()) return;

//         this.#providerProxy.setType(providerType);
//         await this.#providerProxy.requestConnection();

//         // await initWriteWeb3(
//         //     providerType,
//         //     this.#providerProxy.getProvider(providerType)
//         // );

//         this.dispatchEvent(new Event(events.CONNECTED_TO_WALLLET));

//         // register connection data to store
//     }

//     async requestDisconnection() {
//         // if user is not logged in, do nothing
//         if (!validateIfLoggedIn()) return;

//         const providerType =
//             celesteStore.getState().walletReducer.providerWallet;
//         this.#providerProxy.setType(providerType);

//         await this.#providerProxy.requestDisconnection();
//     }

//     async requestChangeNetwork(networkId) {}

//     /* *~~*~~*~~*~~*~~* Private API *~~*~~*~~*~~*~~* */
//     initSmartContracts(){

//         const {smartContracts} = this.#config;

//         smartContracts.forEach(sc => {
//             const {key} = sc;
//             const address = this.#config.addressBook[key];
//             const web3 = celesteStore.getState().web3Reducer.readonlyInstances[key];

//             initSC(address, sc, web3, `_READ.${key}`);
//         }
//     }

//     handdleInteralEvents() {}

//     on(event, callback) {}
// }

// export default CelesteJS;
