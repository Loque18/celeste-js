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
    if(!smartContracts) return;
    const SCFactory = new SmartContractFactory(web3);

    smartContracts.forEach(sc => initSmartContract(sc, SCFactory, key));
}



class CelesteJS {
    #config;
    #providerProxy;

    constructor(config) {
        validateConfig(config);
        this.#config = config;

        // instantiate provider proxy
        this.#providerProxy = new ProviderProxy(config.rpc);
        




        // 1. init static web3
        // const web3RO = this.#getWeb3Instance(providers.READONLY);
        // celesteStore.dispatch(set_web3_readonly_instance(this.#config.rpc.chainId, web3RO));

        // // 2. check if connected
        // (async () => {
        //     const keys = Object.keys(providers);

        //     let connected = false;
        //     let res;
        //     for (let i = 0; i < keys.length; i++) {
        //         const currentKey = keys[i];

        //         // eslint-disable-next-line no-await-in-loop
        //         res = await this.#checkIfConnected(providers[currentKey]);

        //         if (res.accArr) {
        //             connected = true;
        //             break;
        //         }
        //     }


        //     // 3. if connected set web3 instance
        //     if (connected) {
        //         const { accArr, web3 } = res;

        //         initSmartContracts2(web3, this.#config.smartContracts);

        //         celesteStore.dispatch(set_login_status(true));
        //         celesteStore.dispatch(set_address(accArr[0]));
        //         celesteStore.dispatch(set_chain_id(await web3.eth.getChainId()));
        //         celesteStore.dispatch(set_initialized(true));
        //     }

        // })();
    }

    /* *~~*~~*~~*~~*~~* PRIVATE API *~~*~~*~~*~~*~~* */

    
    // #getWeb3Instance(providerType) {
    //     const { rpc } = this.#config;

    //     this.#providerProxy.setType(providerType);
    //     const web3 = new Web3(this.#providerProxy.getProvider(rpc));
    //     return web3;
    // }
    


    // returns connected account in case of success
    // async #checkIfConnected(type) {
    //     const { rpc } = this.#config;

    //     this.#providerProxy.setType(type);

    //     // prettier-ignore
    //     const web3 = new Web3(this.#providerProxy.getProvider(rpc));

    //     const accArr = await web3.eth.getAccounts();

    //     if (accArr.length === 0) return null;

    //     return {
    //         accArr,
    //         web3,
    //     };
    // }

    /* *~~*~~*~~*~~*~~* PUBLIC API *~~*~~*~~*~~*~~* */

    // async requestConnection(providerType) {

    //     validateProviderType(providerType);

    //     this.#providerProxy.setType(providerType);
    //     this.#providerProxy.getProvider(this.#config.rpc);

    //     try {
    //         this.#providerProxy.requestConnection();

    //         // celesteStore.dispatch(set_login_status(true));
	// 		// celesteStore.dispatch(set_chain_id(await web3.eth.getChainId()));
	// 		// celesteStore.dispatch(set_address(accounts[0]));
    //     }
    //     catch (e) {
    //         throw new Error(e);
    //     }
    // }

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
