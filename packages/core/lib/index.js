/* eslint-disable lines-between-class-members */

import { store as celesteStore, actions } from '@celeste-js/store';
import Web3 from 'web3';

import {
    validateConfig,
    validateProviderType,
    validateIfLoggedIn,
} from './validators';

import ProviderProxy from './provider-proxy';
import { providers } from './constants';

const {
    set_address,
    set_readonly_initialized,
    add_web3_readonly_instance,
    set_initialized,
    set_login_status,
    set_web3_instance,
    set_chain_id,
    set_provider_wallet,
} = actions;

const storeWalletData = async (providerType, provider) => {
    const web3 = new Web3(provider);
    const currentChainId = await web3.eth.getChainId();
    const currentAddress = await web3.eth.getAccounts();

    celesteStore.dispatch(set_address(currentAddress[0])); // set current address

    celesteStore.dispatch(set_web3_instance(web3)); // store web3 instance
    celesteStore.dispatch(set_chain_id(currentChainId)); // store chain id

    celesteStore.dispatch(set_provider_wallet(providerType)); // store wallet provider type

    celesteStore.dispatch(set_login_status(true)); // change LoggedIn status

    celesteStore.dispatch(set_initialized(true)); // change initialized status
};

const removeWalletData = () => {
    celesteStore.dispatch(set_address(null)); // set current address

    celesteStore.dispatch(set_web3_instance(null)); // store web3 instance
    celesteStore.dispatch(set_chain_id(null)); // store chain id

    celesteStore.dispatch(set_provider_wallet(null)); // store wallet provider type

    celesteStore.dispatch(set_login_status(false)); // change LoggedIn status

    celesteStore.dispatch(set_initialized(false)); // change initialized status
};

class CelesteJS {
    config = {};
    #providerProxy;

    constructor(config) {
        // 1. store config
        validateConfig(config);
        this.config = config;
        Object.freeze(this.config);

        // 1. init readonly smart contracts

        // 2. instantiate provider proxy
        this.#providerProxy = new ProviderProxy(Object.values(config.rpcs));

        this.listenForProviderEvents();

        this.getPreviosSession();
    }

    /* *~~*~~*~~*~~*~~* Helpful methods *~~*~~*~~*~~* */
    async getPreviosSession() {
        const listOfProviders = [providers.INJECTED, providers.CONNECTED];

        const sessions = await Promise.all(
            listOfProviders.map(async providerType => {
                this.#providerProxy.setType(providerType);
                const provider = await this.#providerProxy.getPreviousSession(
                    providerType
                );

                return {
                    providerType,
                    provider,
                };
            })
        );

        const s = sessions.find(session => session.provider !== null);

        if (s) {
            await storeWalletData(s.providerType, s.provider);
        }
    }

    /* *~~*~~*~~*~~*~~* PUBLIC API *~~*~~*~~*~~*~~* */

    async requestConnection(providerType) {
        validateProviderType(providerType);
        if (validateIfLoggedIn()) return; // if user is already logged in, do nothing

        this.#providerProxy.setType(providerType);
        await this.#providerProxy.requestConnection();

        await storeWalletData(
            providerType,
            this.#providerProxy.getProvider(providerType)
        );
    }

    async requestDisconnection() {
        if (!validateIfLoggedIn()) return; // if user is not logged in, do nothing
        const providerType =
            celesteStore.getState().walletReducer.providerWallet;

        this.#providerProxy.setType(providerType);

        await this.#providerProxy.requestDisconnection();

        removeWalletData();
    }

    /* *~~*~~*~~*~~*~~* HANDLE EVENTS *~~*~~*~~*~~*~~* */
    listenForProviderEvents() {
        const ethProvider = this.#providerProxy.getProvider(providers.INJECTED);
        const wcProvider = this.#providerProxy.getProvider(providers.CONNECTED);

        if (ethProvider) {
            ethProvider.on('accountsChanged', accounts => {
                this.accountsChanged(accounts);
            });

            ethProvider.on('chainChanged', chainId => {});

            ethProvider.on('connect', args => {});

            ethProvider.on('disconnect', error => {});
        }

        if (wcProvider) {
            wcProvider.on('accountsChanged', accounts => {
                this.accountsChanged(accounts);
            });

            wcProvider.on('chainChanged', chainId => {});

            wcProvider.on('disconnect', (code, reason) => {
                if (code === 1000) {
                    this.accountsChanged([]);
                } else {
                    // eslint-disable-next-line no-console
                    console.error('Wallet disconnected', code, reason);
                }
            });
        }
    }

    // eslint-disable-next-line class-methods-use-this
    accountsChanged(accounts) {
        if (!accounts.length > 0) {
            // celesteStore.dispatch(set_address(accounts[0]));
            removeWalletData();
        }
    }
}

export default CelesteJS;
