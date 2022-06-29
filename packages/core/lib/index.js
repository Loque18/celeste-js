/* eslint-disable no-unused-expressions */
/* eslint-disable lines-between-class-members */

import { store as celesteStore, actions } from '@celeste-js/store';
import Web3 from 'web3';

import {
    validateConfig,
    validateProviderType,
    validateIfLoggedIn,
    validateChainId,
} from './validators';

import {
    initSC,
    initSmartContracts,
    removeWriteSmartContracts,
} from './smart-contract-utils/initialize';

import ProviderProxy from './provider-proxy';
import { providers, events } from './constants';

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

const storeWalletData = async (providerType, provider, config) => {
    const web3 = new Web3(provider);
    const currentChainId = await web3.eth.getChainId();
    const currentAddress = await web3.eth.getAccounts();

    celesteStore.dispatch(set_address(currentAddress[0])); // set current address

    celesteStore.dispatch(set_web3_instance(web3)); // store web3 instance
    celesteStore.dispatch(set_chain_id(currentChainId)); // store chain id

    celesteStore.dispatch(set_provider_wallet(providerType)); // store wallet provider type

    celesteStore.dispatch(set_login_status(true)); // change LoggedIn status

    celesteStore.dispatch(set_initialized(true)); // change initialized status

    initSmartContracts(config, web3, currentChainId);
};

const removeWalletData = () => {
    celesteStore.dispatch(set_address(null)); // set current address

    celesteStore.dispatch(set_web3_instance(null)); // store web3 instance
    celesteStore.dispatch(set_chain_id(null)); // store chain id

    celesteStore.dispatch(set_provider_wallet(null)); // store wallet provider type

    celesteStore.dispatch(set_login_status(false)); // change LoggedIn status

    celesteStore.dispatch(set_initialized(false)); // change initialized status

    removeWriteSmartContracts();
};

class CelesteJS {
    config = {};
    #providerProxy;
    #events = {};

    constructor(config) {
        // 1. store config
        validateConfig(config);
        this.config = config;
        Object.freeze(this.config);

        const { rpcs, smartContracts, isMultichain } = config;

        // only read
        // 2. create static web3 for each rpc instance and init read smart contracts
        Object.values(rpcs).forEach(rpc => {
            const web3 = new Web3(rpc.url);

            // prettier-ignore
            celesteStore.dispatch(add_web3_readonly_instance(rpc.chainId, web3));

            // 3. create proxies for each smart contract provided across all rpc instances
            smartContracts.forEach(sc => {
                // 3.1. get address for this chain
                const address = isMultichain
                    ? sc.address[rpc.chainId]
                    : sc.address;

                if (address === undefined) {
                    return;
                }

                // 3.2. check if chain is listed in rpc config
                // prettier-ignore
                if (!Object.values(rpcs).map(_rpc => _rpc.chainId).includes(rpc.chainId)) {
                    // eslint-disable-next-line no-console
                    console.warn(
                        `CelesteJS: config error - chain with id ${rpc.chainId}, provided on element addressBook.${sc.key}, is not listen in rpcs.`
                    );
                    return;
                }

                // 3.3. get sc factory instance for this chain using chainId
                initSC(address, sc, web3, `_READ.${rpc.chainId}`);
            });
        });

        celesteStore.dispatch(set_readonly_initialized(true));

        // 2. instantiate provider proxy
        this.#providerProxy = new ProviderProxy(Object.values(config.rpcs));

        // 3. listen for provider events
        this.listenForProviderEvents();

        // 4. try getting previous session
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
            await storeWalletData(s.providerType, s.provider, this.config);
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
            this.#providerProxy.getProvider(providerType),
            this.config
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

    async requestChangeNetwork(chainId) {
        validateChainId(chainId);
        if (!validateIfLoggedIn()) return; // if user is not logged in, do nothing

        const providerType =
            celesteStore.getState().walletReducer.providerWallet;

        this.#providerProxy.setType(providerType);
        this.#providerProxy.requestChangeNetwork(chainId);
    }

    /* *~~*~~*~~*~~*~~* HANDLE EVENTS *~~*~~*~~*~~*~~* */
    listenForProviderEvents() {
        const ethProvider = this.#providerProxy.getProvider(providers.INJECTED);
        const wcProvider = this.#providerProxy.getProvider(providers.CONNECTED);

        // remove events
        ethProvider.removeAllListeners();
        wcProvider.removeAllListeners();

        if (ethProvider) {
            ethProvider.on('accountsChanged', accounts => {
                this.accountsChanged(accounts);

                this.#events.accountsChanged &&
                    this.#events.accountsChanged(accounts);
            });

            ethProvider.on('chainChanged', chainId => {
                this.chainChanged(parseInt(+chainId, 10));

                this.#events.chainChanged && this.#events.chainChanged(chainId);
            });

            ethProvider.on('connect', args => {
                this.#events.connect && this.#events.connect(args);
            });

            ethProvider.on('disconnect', error => {
                this.#events.disconnect && this.#events.disconnect(error);
            });
        }

        if (wcProvider) {
            wcProvider.on('accountsChanged', accounts => {
                this.accountsChanged(accounts);

                this.#events.accountsChanged &&
                    this.#events.accountsChanged(accounts);
            });

            wcProvider.on('chainChanged', chainId => {
                this.chainChanged(chainId);

                this.#events.chainChanged && this.#events.chainChanged(chainId);
            });

            wcProvider.on('disconnect', (code, reason) => {
                if (code === 1000) {
                    this.accountsChanged([]);
                } else {
                    // eslint-disable-next-line no-console
                    console.error('Wallet disconnected', code, reason);
                }

                this.#events.disconnect &&
                    this.#events.disconnect(code, reason);
            });
        }
    }

    // eslint-disable-next-line class-methods-use-this
    accountsChanged(accounts) {
        if (!accounts.length > 0) {
            // celesteStore.dispatch(set_address(accounts[0]));
            removeWalletData();
        } else {
            celesteStore.dispatch(set_address(accounts[0]));
        }
    }

    // eslint-disable-next-line class-methods-use-this
    chainChanged(chainId) {
        celesteStore.dispatch(set_chain_id(chainId));

        if (!validateIfLoggedIn()) return;
        removeWriteSmartContracts();

        const { rpcs } = this.config;

        const chainIds = Object.values(rpcs).map(rpc => +rpc.chainId);

        if (!chainIds.includes(+chainId)) return;

        // prettier-ignore
        const providerType = celesteStore.getState().walletReducer.providerWallet;
        const provider = this.#providerProxy.getProvider(providerType);

        storeWalletData(providerType, provider, this.config);
    }

    on(eventKey, callback) {
        if (!Object.values(events).includes(eventKey))
            throw new Error(`Event ${eventKey} does not exist`);

        this.#events[eventKey] = callback;
    }
}

export default CelesteJS;
