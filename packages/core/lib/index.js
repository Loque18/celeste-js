/* eslint-disable no-plusplus */
/* eslint-disable lines-between-class-members */

import { store as celesteStore, actions } from '@celeste-js/store';
import Web3 from 'web3';

import SmartContractFactory from './smart-contract-utils/factory';
import {
    initSmartContracts,
    removeWriteSmartContracts,
} from './smart-contract-utils/initialize';
// import initSmartContract from './smart-contract-utils/initialize';

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
    #internalEvents = {};

    configread;

    constructor(config) {
        validateConfig(config);
        this.#config = config;
        this.configread = config;

        const { rpcs, smartContracts, addressBook } = config;

        // 1. init static web3 for each rpc instance
        const SCFactories = {};

        const rpcsArray = Object.values(rpcs);

        rpcsArray.forEach(rpc => {
            const { url, chainId } = rpc;

            const web3 = new Web3(url);

            celesteStore.dispatch(add_web3_readonly_instance(chainId, web3));

            const SCFactory = new SmartContractFactory(web3);

            SCFactories[chainId] = SCFactory;
        });

        // 2. instantiate read smart contracts for each chain, if address is provided
        if (smartContracts) {
            smartContracts.forEach(sc => {
                if (!addressBook[sc.key]) return;

                const deploys = addressBook[sc.key];

                Object.keys(deploys).forEach(chainId => {
                    // 2.1. get deployed address for this chain
                    const address = deploys[chainId];

                    const chainIds = rpcsArray.map(rpc => +rpc.chainId);

                    // 2.2. check if chain is listed in rpc config
                    if (!chainIds.includes(+chainId)) {
                        // eslint-disable-next-line no-console
                        console.warn(
                            `CelesteJS: config error - chain with id ${chainId}, provided on element addressBook.${sc.key}, is not listen in rpcs.`
                        );
                        return;
                    }

                    // 2.3. get sc factory instance for this chain using chainId
                    const SCFactory = SCFactories[chainId];

                    // 2.4. init smart contract
                    const contract = SCFactory.create(sc.abi, address);
                    celesteStore.dispatch(
                        add_contract(`${sc.key}_READ.${chainId}`, contract)
                    );
                });
            });
        }

        celesteStore.dispatch(set_readonly_initialized(true));

        // 3. instantiate provider proxy
        this.#providerProxy = new ProviderProxy(rpcsArray);

        // 4. check if wallet is connected to dapp
        (async () => {
            const res = await Promise.all([
                this.#checkIfConnected(providers.INJECTED),
                this.#checkIfConnected(providers.CONNECTED),
            ]);

            const connected = res.find(r => r !== null);

            if (!connected) return;

            const type =
                res.indexOf(connected) === 0
                    ? providers.INJECTED
                    : providers.CONNECTED;

            // 4.1. if connected set web3 instance

            const { accounts, web3 } = connected;
            // initSmartContracts2(web3, this.#config.smartContracts);

            const currentChainId = await web3.eth.getChainId();

            initSmartContracts(config, web3);

            // prettier-ignore
            celesteStore.dispatch(set_chain_id(currentChainId));
            celesteStore.dispatch(set_web3_instance(web3));
            celesteStore.dispatch(set_initialized(true));
            celesteStore.dispatch(set_provider_wallet(type));
            celesteStore.dispatch(set_address(accounts[0]));
            celesteStore.dispatch(set_login_status(true));
            this.#providerProxy.setType(type);
        })();

        this.internalEvents();

        // 5. avoid object mutation
        Object.freeze(this);
    }

    /* *~~*~~*~~*~~*~~* PRIVATE API *~~*~~*~~*~~*~~* */

    // returns connected account in case of success
    async #checkIfConnected(type) {
        this.#providerProxy.setType(type);
        const connection = await this.#providerProxy.getConnection(type);
        return connection;
    }

    // eslint-disable-next-line class-methods-use-this

    // #onChainChanged(chainId) {
    //     const { isLoggedIn } = celesteStore.getState().walletReducer;

    //     if (!isLoggedIn) return;

    //     const rpcsArray = Object.values(this.#config.rpcs);

    //     const current = rpcsArray.find(rpc => rpc.chainId === chainId);

    //     if (current === null) return;

    //     const web3 = new Web3(current.url);

    //     this.#removeSmartContracts();
    //     this.#initSmartContracts(web3);

    //     celesteStore.dispatch(set_web3_instance(web3));
    // }

    // /* *~~*~~*~~*~~*~~* PUBLIC API *~~*~~*~~*~~*~~* */

    async requestConnection(providerType) {
        validateProviderType(providerType);
        // if user is already logged in, do nothing
        if (validateIfLoggedIn()) return;

        this.#providerProxy.setType(providerType);

        await this.#providerProxy.requestConnection();

        const provider = this.#providerProxy.getProvider(providerType);

        if (provider === null) return;

        // prettier-ignore
        const web3 = new Web3(provider);

        initSmartContracts(this.#config, web3);

        celesteStore.dispatch(set_web3_instance(web3));
        celesteStore.dispatch(set_provider_wallet(providerType));
        celesteStore.dispatch(set_login_status(true));
        celesteStore.dispatch(set_chain_id(await web3.eth.getChainId()));
        celesteStore.dispatch(set_initialized(true));
    }

    async requestDisconnection() {
        // if user is not logged in, do nothing
        if (!validateIfLoggedIn()) return;

        const providerType =
            celesteStore.getState().walletReducer.providerWallet;
        this.#providerProxy.setType(providerType);

        await this.#providerProxy.requestDisconnection();

        removeWriteSmartContracts();
    }

    async requestChangeNetwork(chainId) {
        validateChainId(chainId);
        // if user is not logged in, do nothing
        if (!validateIfLoggedIn()) return;

        const providerType =
            celesteStore.getState().walletReducer.providerWallet;
        this.#providerProxy.setType(providerType);

        await this.#providerProxy.requestChangeNetwork(chainId);
    }

    /* *~~*~~*~~*~~*~~* INTERNAL EVENTS *~~*~~*~~*~~*~~* */
    internalEvents() {
        const onChainChanged = chainId => {
            if (!validateIfLoggedIn()) return;
            console.log('removing scs');
            removeWriteSmartContracts();

            const { rcps } = this.#config;

            const chainIds = Object.values(rcps).map(rpc => rpc.chainId);

            if (!chainIds.includes(chainId)) return;

            const web3 = new Web3(rcps[chainId].url);
            initSmartContracts(this.#config, web3);
        };

        this.#internalEvents = {
            onChainChanged,
        };

        this.#providerProxy.registerEvents(this.#internalEvents);
    }

    /* *~~*~~*~~*~~*~~* PUBLIC EVENTS *~~*~~*~~*~~*~~* */
    on(event, callback) {
        if (!Object.values(events).includes(event))
            throw new Error(`Event ${event} does not exist`);

        let CB = callback;

        if (event === events.CHAIN_CHANGED) {
            CB = chainId => {
                callback(chainId);
                this.#internalEvents.onChainChanged(chainId);
            };
        }

        this.#events[event] = CB;

        this.#providerProxy.registerEvents(this.#events);
    }
}

export default CelesteJS;
