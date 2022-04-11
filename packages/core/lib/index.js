import { store as celesteStore, actions } from '@celeste-js/store';

import { initWeb3, initStaticWeb3 } from './web3';

const { add_contract, set_initialized } = actions;

const initCeleste = async options => {
    // check errors
    if (!options.rpc) throw new Error('celeste JS: rpc is required');

    // init web3
    await initWeb3();

    // init static web3
    await initStaticWeb3(options.rpc);

    const { web3, web3read } = celesteStore.getState().web3Reducer;

    if (options.smartContracts) {
        options.smartContracts.forEach(sc => {
            if (web3) {
                const contract = new web3.eth.Contract(sc.abi, sc.address);
                celesteStore.dispatch(add_contract(sc.key, contract));
            }

            const web3s = web3read[options.rpc.chainId];
            const contractRead = new web3s.eth.Contract(sc.abi, sc.address);
            celesteStore.dispatch(add_contract(`${sc.key}_READ`, contractRead));
        });
    }

    celesteStore.dispatch(set_initialized(true));
};

export default initCeleste;
