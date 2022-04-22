/* eslint-disable no-plusplus */
import { store as celesteStore, actions } from '@celeste-js/store';

import Web3 from 'web3';

/* eslint-disable lines-between-class-members */

import SmartContractFactory from './smart-contract-utils/factory';
import initSmartContract from './smart-contract-utils/initialize';

import ProviderProxy from './provider-proxy';
import { providers } from './contants';

import { validateConfig, validateProviderType } from './validators';

const {
    set_initialized,
    set_readonly_initialized,
    set_web3_readonly_instance,
    set_web3_instance,
    add_address,
    set_login_status,
    set_address,
    set_chain_id,
} = actions;

const celesteEvents = {
    ready: 'READY',
    connected: 'CONNECTED',
};

const initSmartContracts2 = (web3, smartContracts, key = '') => {
    if (!smartContracts) return;
    const SCFactory = new SmartContractFactory(web3);

    smartContracts.forEach(sc => initSmartContract(sc, SCFactory, key));
};

class CelesteJS {
    #config;
    #providerProxy;

    constructor(config) {
        validateConfig(config);
        this.#config = config;

        // instantiate provider proxy
        this.#providerProxy = new ProviderProxy(config.rpc);

        // 1. init static web3
        const web3RO = new Web3(
            this.#providerProxy.getProvider(providers.READONLY)
        );
        celesteStore.dispatch(
            set_web3_readonly_instance(this.#config.rpc.chainId, web3RO)
        );
        celesteStore.dispatch(set_readonly_initialized(true));
        initSmartContracts2(web3RO, this.#config.smartContracts, '_READ');

        // // 2. check if connected
        (async () => {
            const res = await Promise.all([
                this.#checkIfConnected(providers.INJECTED),
                this.#checkIfConnected(providers.CONNECTED),
            ]);

            console.log(res);

            // const connected = res.find(r => r !== null);
            // 3. if connected set web3 instance
            // if (connected) {
            //     console.log("connected");
            //     const { accArr, web3 } = connected;
            //     initSmartContracts2(web3, this.#config.smartContracts);
            //     celesteStore.dispatch(set_login_status(true));
            //     celesteStore.dispatch(set_address(accArr[0]));
            //     celesteStore.dispatch(set_chain_id(await web3.eth.getChainId()));
            //     celesteStore.dispatch(set_initialized(true));
            // }
        })();
    }

    /* *~~*~~*~~*~~*~~* PRIVATE API *~~*~~*~~*~~*~~* */

    // returns connected account in case of success
    async #checkIfConnected(type) {
        this.#providerProxy.setType(type);
        const connection = await this.#providerProxy.getConnection(type);

        return connection;
    }

    /* *~~*~~*~~*~~*~~* PUBLIC API *~~*~~*~~*~~*~~* */

    async requestConnection(providerType) {
        validateProviderType(providerType);

        this.#providerProxy.setType(providerType);

        try {
            this.#providerProxy.requestConnection();

            // celesteStore.dispatch(set_login_status(true));
            // celesteStore.dispatch(set_chain_id(await web3.eth.getChainId()));
            // celesteStore.dispatch(set_address(accounts[0]));
        } catch (e) {
            throw new Error(e);
        }
    }

    // async requestDisconnection(providerType) {
    //     validateProviderType(providerType);

    //     this.#providerProxy.setType(providerType);
    //     this.#providerProxy.getProvider(this.#config.rpc);

    //     try {
    //         this.#providerProxy.requestDisconnection();
    //     }
    //     catch (e) {
    //         throw new Error(e);
    //     }
    // }
}

export default CelesteJS;
