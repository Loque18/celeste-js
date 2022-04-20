import { store as celesteStore, actions } from '@celeste-js/store';

import Web3 from 'web3';

/* eslint-disable lines-between-class-members */
import getReadOnlyWeb3 from './provider/provider-types/read-only';

import SmartContractFactory from './smart-contract-utils/factory';
import initSmartContract from './smart-contract-utils/initialize';

import ProviderHandler from './provider';

import Context from './actions/context';

const {
    set_initialized,
    set_initialized_readonly,
    set_web3_readonly_instance,
    set_web3_instance,
    add_address,
} = actions;

const celesteEvents = {
    ready: 'READY',
    connected: 'CONNECTED',
};

class CelesteJS {
    #eventsElemnt;
    #config;
    #provider;

    constructor(config) {
        this.#config = config;

        this.#initWeb3readOnly();

        this.#eventsElemnt = document.createElement('div');
        this.#eventsElemnt.id = 'celeste-js-events';
        document.body.appendChild(this.#eventsElemnt);

        const actionContext = new Context();
    }

    /* *~~*~~*~~*~~*~~* PRIVATE METHODS *~~*~~*~~*~~*~~* */

    #initWeb3readOnly() {
        const { rpc, smartContracts } = this.#config;

        if (!rpc)
            throw new Error(
                'celeste JS: rpc must be specified in celeste.config.js'
            );

        const web3_readonly = getReadOnlyWeb3(rpc);

        if (smartContracts) {
            const SCFactory = new SmartContractFactory(web3_readonly);

            smartContracts.forEach(sc => {
                initSmartContract(sc, SCFactory, '_READ');
            });
        }

        // celesteStore.dispatch(set_ro_initialized(true));
        celesteStore.dispatch(
            set_web3_readonly_instance(
                rpc.chainName,
                rpc.chainId,
                web3_readonly
            )
        );

        celesteStore.dispatch(set_initialized_readonly(true));

        this.#eventsElemnt.dispatchEvent(
            new CustomEvent(celesteEvents.ready, {
                detail: { web3: web3_readonly },
            })
        );
    }

    async #initWeb3(providerType) {
        const { rpc, smartContracts } = this.#config;

        const providerHandler = new ProviderHandler(providerType);
        const provider = await providerHandler.getProvider();
        this.#provider = provider;

        const web3 = new Web3(provider);

        if (smartContracts) {
            const SCFactory = new SmartContractFactory(web3);

            smartContracts.forEach(sc => {
                initSmartContract(sc, SCFactory);
            });
        }

        celesteStore.dispatch(set_web3_instance(web3));
        celesteStore.dispatch(set_initialized(true));

        this.#eventsElemnt.dispatchEvent(
            new CustomEvent(celesteEvents.connected, { detail: { web3 } })
        );
    }

    async requestConection(providerType) {}

    // requestDisconnection() {

    // }

    // requestChangeNetwork() {}

    on(event, callback) {
        this.#eventsElemnt.addEventListener(event, e => {
            const { detail } = e;
            callback(detail);
        });
    }
}

export default CelesteJS;

// const Celeste = new CelesteJS();

// Celeste.on('ready', web3RO => {
//     console.log(web3RO);
//     // read data from blockchain
// });

// // request connection
// Celeste.requestConection();

// Celeste.on('connected', () => {
//     // ready to do tx and read private data from blockchain
// });

// // request disconnection
// Celeste.requestDisconnection();

// Celeste.on('disconnected', () => {});
