import { store as celesteStore, actions } from '@celeste-js/store';

const { add_contract, remove_contract } = actions;

export const removeWriteSmartContracts = () => {
    const { contracts } = celesteStore.getState().web3Reducer;

    Object.keys(contracts).forEach(key => {
        if (key.includes('_READ')) return;
        celesteStore.dispatch(remove_contract(key, null));
    });
};

// prettier-ignore
export const initSC = (address, smartContract, web3, key) => {

    const {abi, key: scKey} = smartContract;

    const contract = new web3.eth.Contract(abi, address);
    celesteStore.dispatch(add_contract(`${scKey}${key}`, contract));
};

export const initSmartContracts = async (config, web3, chainId) => {
    const { smartContracts, isMultichain } = config;

    smartContracts.forEach(async sc => {
        const address = isMultichain ? sc.address[chainId] : sc.address;

        if (!address) return;

        // if (
        //     !Object.values(rpcs)
        //         .map(_rpc => _rpc.chainId)
        //         .includes(chainId)
        // ) {
        //     // eslint-disable-next-line no-console
        //     console.warn(
        //         `CelesteJS: config error - chain with id ${chainId}, provided on element address.${sc.key}, is not listen in rpcs.`
        //     );
        //     return;
        // }

        initSC(address, sc, web3, '');
    });
};
