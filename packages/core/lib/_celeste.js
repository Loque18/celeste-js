// class CelesteJS {
//     #eventsElemnt;
//     #config;
//     #providerHandler;

//     constructor(config) {
//         this.#config = config;

//         this.#eventsElemnt = document.createElement('div');
//         this.#eventsElemnt.id = 'celeste-js-events';
//         document.body.appendChild(this.#eventsElemnt);

//         this.#initWeb3readOnly();

//         const providerTypes = Object.keys(providers);

//         for(let i = 0; i < providerTypes.length; i++) {

//             const provider = new ProviderHandler(providerType);
//             const web3 = new Web3(provider);

//             const accArr = await web3.eth.getAccounts();

// 		    if (accArr.length === 0) store.dispatch(set_login_status(false));
// 		    else {
// 			    store.dispatch(set_login_status(true));
// 			    store.dispatch(set_address(accArr[0]));
// 			    store.dispatch(set_chain_id(await web3.eth.getChainId()));
// 		    }
//         }






//         // 1. get provider
//         // 2. instance web3
//         // 3. detect connection
//     }

//     /* *~~*~~*~~*~~*~~* UTIL METHODS *~~*~~*~~*~~*~~* */
//     async #createProvider(providerType) {
//         const { rpc } = this.#config;
//         const providerHandler = new ProviderHandler(providerType);
//         await providerHandler.init(rpc);
//         return providerHandler;
//     }

//     /* *~~*~~*~~*~~*~~* PRIVATE API *~~*~~*~~*~~*~~* */

//     checkConnection() {}

//     #initWeb3readOnly() {
//         const { rpc, smartContracts } = this.#config;

//         if (!rpc)
//             throw new Error(
//                 'celeste JS: rpc must be specified in celeste.config.js'
//             );

//         const web3_readonly = getReadOnlyWeb3(rpc);

//         if (smartContracts) {
//             const SCFactory = new SmartContractFactory(web3_readonly);

//             smartContracts.forEach(sc => {
//                 initSmartContract(sc, SCFactory, '_READ');
//             });
//         }

//         // celesteStore.dispatch(set_ro_initialized(true));
//         celesteStore.dispatch(
//             set_web3_readonly_instance(rpc.chainId, web3_readonly)
//         );

//         celesteStore.dispatch(set_readonly_initialized(true));

//         this.#eventsElemnt.dispatchEvent(
//             new CustomEvent(celesteEvents.ready, {
//                 detail: { web3: web3_readonly },
//             })
//         );
//     }

//     // async #initWeb3(providerType) {
//     //     const web3 = new Web3(provider);

//     //     if (smartContracts) {
//     //         const SCFactory = new SmartContractFactory(web3);

//     //         smartContracts.forEach(sc => {
//     //             initSmartContract(sc, SCFactory);
//     //         });
//     //     }

//     //     celesteStore.dispatch(set_web3_instance(web3));
//     //     celesteStore.dispatch(set_initialized(true));

//     //     this.#eventsElemnt.dispatchEvent(
//     //         new CustomEvent(celesteEvents.connected, { detail: { web3 } })
//     //     );
//     // }

//     /* *~~*~~*~~*~~*~~* PUBLIC API *~~*~~*~~*~~*~~* */
//     async requestConnection(providerType) {
//         // check validity of providerType
//         if (
//             providerType == null ||
//             !Object.values(providers).includes(providerType)
//         )
//             throw new Error('Invalid provider type');

//         this.#providerHandler = await this.#createProvider(providerType);
//         await this.#providerHandler.requestConnection();

//         // const context = this.createActionsContext(providerType);

//         // await context.requestConnection(this.#provider);

//         // celesteStore.dispatch(set_login_status(true));
//     }

//     requestDisconnection() {
//         if (this.#providerHandler == null)
//             throw new Error('Connection is not established');

//         this.provider.requestDisconnection();
//     }

//     // requestChangeNetwork() {}

//     on(event, callback) {
//         this.#eventsElemnt.addEventListener(event, e => {
//             const { detail } = e;
//             callback(detail);
//         });
//     }
// }

// export default CelesteJS;
