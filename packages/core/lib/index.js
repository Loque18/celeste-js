import { store as celesteStore, actions } from '@celeste-js/store';

import Web3 from 'web3';

/* eslint-disable lines-between-class-members */

import SmartContractFactory from './smart-contract-utils/factory';
import initSmartContract from './smart-contract-utils/initialize';

import ProviderProxy from './provider-proxy';
import { providers } from './contants';

const {
    set_initialized,
    set_readonly_initialized,
    set_web3_readonly_instance,
    set_web3_instance,
    add_address,
    set_login_status,
} = actions;

const celesteEvents = {
    ready: 'READY',
    connected: 'CONNECTED',
};

class CelesteJS {
    #config;
    #providerProxy;

    constructor(config) {
        this.#config = config;

        // instantiate provider proxy
        this.#providerProxy = new ProviderProxy(providers.ONLYREAD);

        this.#initWeb3Readonly();
    }

    /* *~~*~~*~~*~~*~~* PRIVATE API *~~*~~*~~*~~*~~* */

    #initWeb3Readonly() {
        this.#providerProxy.setType(providers.ONLYREAD);

        const { rpc, smartContracts } = this.#config;

        // prettier-ignore
        if (!rpc) throw new Error('celeste JS: rpc must be specified in celeste.config.js');

        const web3_readonly = new Web3(this.#providerProxy.getProvider(rpc));

        if (smartContracts) {
            const SCFactory = new SmartContractFactory(web3_readonly);

            smartContracts.forEach(sc =>
                initSmartContract(sc, SCFactory, '_READ')
            );
        }
    }

    // returns bool
    #checkIfConnected(type) {
        this.#providerProxy.setType(type);
    }
}

export default CelesteJS;
