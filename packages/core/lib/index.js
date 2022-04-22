/* eslint-disable no-plusplus */
/* eslint-disable lines-between-class-members */

import { store as celesteStore, actions } from '@celeste-js/store';
import Web3 from 'web3';

import SmartContractFactory from './smart-contract-utils/factory';
import initSmartContract from './smart-contract-utils/initialize';

import ProviderProxy from './provider-proxy';
import { providers } from './contants';

import {
    validateConfig,
    validateProviderType,
    validateIfLoggedIn,
} from './validators';

const {
    set_initialized,
    set_readonly_initialized,
    set_web3_readonly_instance,
    set_web3_instance,
    set_provider_wallet,
    set_login_status,
    set_address,
    set_chain_id,
} = actions;

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

        // 2. check if connected
        (async () => {
            const res = await Promise.all([
                this.#checkIfConnected(providers.INJECTED),
                this.#checkIfConnected(providers.CONNECTED),
            ]);

            const connected = res.find(r => r !== null);

            const type =
                res.indexOf(connected) === 0
                    ? providers.INJECTED
                    : providers.CONNECTED;

            // 3. if connected set web3 instance
            if (connected) {
                const { accounts, web3 } = connected;
                initSmartContracts2(web3, this.#config.smartContracts);
                celesteStore.dispatch(set_login_status(true));
                celesteStore.dispatch(set_address(accounts[0]));
                celesteStore.dispatch(set_web3_instance(web3));
                // prettier-ignore
                celesteStore.dispatch(set_chain_id(await web3.eth.getChainId()));
                celesteStore.dispatch(set_initialized(true));
                celesteStore.dispatch(set_provider_wallet(type));
            }
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
        if (validateIfLoggedIn()) return;

        this.#providerProxy.setType(providerType);

        try {
            await this.#providerProxy.requestConnection();

            // prettier-ignore
            const web3 = new Web3(this.#providerProxy.getProvider(providerType));

            const acc = await web3.eth.getAccounts();

            celesteStore.dispatch(set_login_status(true));
            celesteStore.dispatch(set_address(acc[0]));
            celesteStore.dispatch(set_web3_instance(web3));
            celesteStore.dispatch(set_chain_id(await web3.eth.getChainId()));
            celesteStore.dispatch(set_initialized(true));
            celesteStore.dispatch(set_provider_wallet(providerType));
        } catch (e) {
            throw new Error(e);
        }
    }

    async requestDisconnection() {
        const providerType =
            celesteStore.getState().walletReducer.providerWallet;
        this.#providerProxy.setType(providerType);

        try {
            this.#providerProxy.requestDisconnection();

            celesteStore.dispatch(set_login_status(false));
            celesteStore.dispatch(set_address(null));
            celesteStore.dispatch(set_web3_instance(null));
            celesteStore.dispatch(set_chain_id(null));
            celesteStore.dispatch(set_initialized(false));
            celesteStore.dispatch(set_provider_wallet(null));
        } catch (e) {
            throw new Error(e);
        }
    }
}

export default CelesteJS;
