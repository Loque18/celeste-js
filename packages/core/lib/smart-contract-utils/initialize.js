import { store as celesteStore, actions } from '@celeste-js/store';

const { add_contract } = actions;

const initSmartContract = (sc, scFactory, keyTemplate = '') => {
    const contract = scFactory.create(sc.abi, sc.address);
    celesteStore.dispatch(add_contract(`${sc.key}${keyTemplate}`, contract));
};

export default initSmartContract;
