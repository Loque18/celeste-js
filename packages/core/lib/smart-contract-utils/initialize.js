import { store as celesteStore, actions } from '@celeste-js/store';
import SmartContractFactory from './factory';

const { add_contract } = actions;

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
