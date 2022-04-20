// import { store as celesteStore, actions } from '@celeste-js/store';

// import requestConection from './providers/connected';

import { getConnectedProvider } from './providers/connected';
import { getInjectedProvider } from './providers/injected';
import getReadOnlyWeb3 from './providers/read-only';

// import { initWeb3, initStaticWeb3 } from './web3';

// const { add_contract, set_initialized } = actions;

const onWalletConnect = async ({ type }) => {
    const provider = await getWeb3Provider(type);

    const web3 = new Web3(provider);

    if (options.smartContracts) {
        const SCFactory = new SmartContractFactory(web3);

        options.smartContracts.forEach(sc => {
            initSmartContract(sc, SCFactory);
        });
    }

    // ready to do tx and read private data from blockchain

    // emit ready event
};

const SmartContractFactory = function (web3Instance) {
    return {
        create: (abi, address) => new web3Instance.eth.Contract(abi, address),
    };
};

const initSmartContract = (sc, scFactory, keyTemplate = '') => {
    const contract = scFactory.create(sc.abi, sc.address);
    celesteStore.dispatch(add_contract(`${sc.key}${keyTemplate}`, contract));
};

const initCeleste = async options => {
    // check errors
    if (!options.rpc) throw new Error('celeste JS: rpc is required');

    // init read only web3
    const web3_readonly = getReadOnlyProvider(options.rpc);

    // init web3
    // await initWeb3();

    // // init static web3
    // await initStaticWeb3(options.rpc);

    // const { web3, web3read } = celesteStore.getState().web3Reducer;

    // init smart contracts read only
    if (options.smartContracts) {
        const SCFactory = new SmartContractFactory(web3_readonly);

        options.smartContracts.forEach(sc => {
            initSmartContract(sc, SCFactory, '_READ');
        });
    }

    // ready to read public data from blockchain
};

// export default initCeleste;
export default requestConection;
