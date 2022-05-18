/* eslint-disable no-plusplus */
/* eslint-disable lines-between-class-members */

import { store as celesteStore, actions } from '@celeste-js/store';
import Web3 from 'web3';

import SmartContractFactory from './smart-contract-utils/factory';
import initSmartContract from './smart-contract-utils/initialize';

import ProviderProxy from './provider-proxy';
import { providers, events } from './constants';

import {
    validateConfig,
    validateProviderType,
    validateIfLoggedIn,
    validateChainId,
} from './validators';

const {
    set_initialized,
    set_readonly_initialized,
    add_web3_readonly_instance,
    set_web3_instance,
    set_provider_wallet,
    set_login_status,
    set_address,
    set_chain_id,
    add_contract,
} = actions;

// const initSmartContracts2 = (web3, smartContracts, key = '') => {
//     if (!smartContracts) return;
//     const SCFactory = new SmartContractFactory(web3);

//     smartContracts.forEach(sc => initSmartContract(sc, SCFactory, key));
// };

class CelesteJS {
    #config;
    #providerProxy;
    #events = {};

    configread;

    constructor(config) {
        validateConfig(config);
        this.#config = config;
        this.configread = config;

        // 1. init static web3 for each rpc instance
        const web3Instances = [];
        const rpcsArray = Object.values(config.rpcs);

        rpcsArray.forEach(rpc => {
            const { url, chainId } = rpc;

            const web3 = new Web3(url);

            celesteStore.dispatch(add_web3_readonly_instance(chainId, web3));

            web3Instances.push(web3);
        });

        console.log('yep', web3Instances);

        // celesteStore.dispatch(set_readonly_initialized(true));

        // // 2. instantiate read smart contracts for each rpc
        // if (config.smartContracts) {
        //     web3Instances.forEach((web3, i) => {
        //         const { chainId } = rpcsArray[i];

        //         const SCFactory = new SmartContractFactory(web3);

        //         config.smartContracts.forEach(sc => {
        //             const contract = SCFactory.create(sc.abi, sc.address);
        //             // prettier-ignore
        //             celesteStore.dispatch(add_contract(`${sc.key}_READ.${chainId}`, contract));
        //         });
        //     });
        // }

        // 3. instantiate provider proxy
        // this.#providerProxy = new ProviderProxy(config.rpcs);

        // 4. check if wallet is connected to dapp
        // (async () => {
        //     const res = await Promise.all([
        //         this.#checkIfConnected(providers.INJECTED),
        //         this.#checkIfConnected(providers.CONNECTED),
        //     ]);

        //     const connected = res.find(r => r !== null);

        //     if (!connected) return;

        //     const type =
        //         res.indexOf(connected) === 0
        //             ? providers.INJECTED
        //             : providers.CONNECTED;

        //     // 3. if connected set web3 instance

        //     const { accounts, web3 } = connected;
        //     initSmartContracts2(web3, this.#config.smartContracts);
        //     // prettier-ignore
        //     celesteStore.dispatch(set_chain_id(await web3.eth.getChainId()));
        //     celesteStore.dispatch(set_web3_instance(web3));
        //     celesteStore.dispatch(set_initialized(true));
        //     celesteStore.dispatch(set_provider_wallet(type));
        //     celesteStore.dispatch(set_address(accounts[0]));
        //     celesteStore.dispatch(set_login_status(true));
        //     this.#providerProxy.setType(type);
        // })();

        // 5. avoid object mutation
        Object.freeze(this);
    }

    /* *~~*~~*~~*~~*~~* PRIVATE API *~~*~~*~~*~~*~~* */

    // // returns connected account in case of success
    // async #checkIfConnected(type) {
    //     this.#providerProxy.setType(type);
    //     const connection = await this.#providerProxy.getConnection(type);
    //     return connection;
    // }

    // /* *~~*~~*~~*~~*~~* PUBLIC API *~~*~~*~~*~~*~~* */

    // async requestConnection(providerType) {
    //     validateProviderType(providerType);
    //     // if user is already logged in, do nothing
    //     if (validateIfLoggedIn()) return;

    //     this.#providerProxy.setType(providerType);

    //     await this.#providerProxy.requestConnection();

    //     const provider = this.#providerProxy.getProvider(providerType);

    //     if (provider === null) return;

    //     // prettier-ignore
    //     const web3 = new Web3(provider);
    //     celesteStore.dispatch(set_web3_instance(web3));
    //     celesteStore.dispatch(set_provider_wallet(providerType));
    //     celesteStore.dispatch(set_login_status(true));
    //     celesteStore.dispatch(set_chain_id(await web3.eth.getChainId()));
    //     celesteStore.dispatch(set_initialized(true));
    // }

    // async requestDisconnection() {
    //     // if user is not logged in, do nothing
    //     if (!validateIfLoggedIn()) return;

    //     const providerType =
    //         celesteStore.getState().walletReducer.providerWallet;
    //     this.#providerProxy.setType(providerType);

    //     await this.#providerProxy.requestDisconnection();
    // }

    // async requestChangeNetwork(chainId) {
    //     validateChainId(chainId);
    //     // if user is not logged in, do nothing
    //     if (!validateIfLoggedIn()) return;

    //     const providerType =
    //         celesteStore.getState().walletReducer.providerWallet;
    //     this.#providerProxy.setType(providerType);

    //     await this.#providerProxy.requestChangeNetwork(chainId);
    // }

    // /* *~~*~~*~~*~~*~~* PUBLIC EVENTS *~~*~~*~~*~~*~~* */
    // on(event, callback) {
    //     if (!Object.values(events).includes(event))
    //         throw new Error(`Event ${event} does not exist`);

    //     this.#events[event] = callback;

    //     this.#providerProxy.registerEvents(this.#events);
    // }
}

export default CelesteJS;
