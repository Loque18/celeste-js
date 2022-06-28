import { store as celesteStore, actions } from '@celeste-js/store';
import Web3 from 'web3';
import SmartContractFactory from './factory';

const {
    add_contract,
    set_web3_instance,
    set_provider_wallet,
    set_login_status,
    set_chain_id,
    set_initialized,
} = actions;

export const initSmartContracts = async (config, web3) => {
    const { smartContracts, addressBook, rpcs } = config;

    const currentChainId = await web3.eth.getChainId();

    const chainIds = Object.values(rpcs).map(rpc => rpc.chainId);

    if (smartContracts && chainIds.includes(currentChainId)) {
        smartContracts.forEach(async sc => {
            if (!addressBook[sc.key]) return;

            // prettier-ignore
            const deployOnCurrentChain = config.addressBook[sc.key][currentChainId];

            if (!deployOnCurrentChain) return;

            const SCFactory = new SmartContractFactory(web3);

            const contract = SCFactory.create(sc.abi, deployOnCurrentChain);
            celesteStore.dispatch(add_contract(`${sc.key}`, contract));
        });
    }
};

export const removeWriteSmartContracts = () => {
    const { contracts } = celesteStore.getState().web3Reducer;

    Object.keys(contracts).forEach(key => {
        if (key.includes('_READ')) return;
        celesteStore.dispatch(add_contract(key, null));
    });
};

// prettier-ignore
export const initSC = (address, smartContract, web3, key) => {

    const {abi, key: scKey} = smartContract;

    const contract = new web3.eth.Contract(abi, address);
    celesteStore.dispatch(add_contract(`${scKey}${key}`, contract));
};

export const initWriteWeb3 = async (providerType, provider) => {
    const web3 = new Web3(provider);
    const chainId = await web3.eth.getChainId();

    celesteStore.dispatch(set_web3_instance(web3));
    celesteStore.dispatch(set_provider_wallet(providerType));
    celesteStore.dispatch(set_login_status(true));
    celesteStore.dispatch(set_chain_id(chainId));
    celesteStore.dispatch(set_initialized(true));
};

export const removeWeb3 = () => {
    celesteStore.dispatch(set_web3_instance(null));
    celesteStore.dispatch(set_provider_wallet(null));
    celesteStore.dispatch(set_login_status(false));
    celesteStore.dispatch(set_chain_id(null));
    celesteStore.dispatch(set_initialized(false));
};
