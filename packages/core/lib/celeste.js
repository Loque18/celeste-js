/* eslint-disable lines-between-class-members */
import getReadOnlyWeb3 from './providers/read-only';

import getConfig from './find-config';

const celesteEvents = {
    ready: 'READY',
    connected: 'CONNECTED',
};

class CelesteJS {
    #eventsElemnt;
    #config;

    constructor() {
        this.#config = getConfig();

        this.#initWeb3readOnly();

        this.#eventsElemnt = document.createElement('div');
        this.#eventsElemnt.id = 'celeste-js-events';
        document.body.appendChild(this.#eventsElemnt);
    }

    /* *~~*~~*~~*~~*~~* PRIVATE METHODS *~~*~~*~~*~~*~~* */

    #initWeb3readOnly() {
        if (!this.#config.rpc)
            throw new Error(
                'celeste JS: rpc must be specified in celeste.config.js'
            );

        const web3_readonly = getReadOnlyWeb3(this.#config.rpc);

        if (this.#config.smartContracts) {
            const SCFactory = new SmartContractFactory(web3_readonly);

            options.smartContracts.forEach(sc => {
                initSmartContract(sc, SCFactory, '_READ');
            });
        }

        // this.#eventsElemnt.dispatchEvent(
        //     new CustomEvent(celesteEvents.ready, { detail: { web3RO: {} } })
        // );
    }

    requestConection() {}

    requestDisconnection() {}

    requestChangeNetwork() {}

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
