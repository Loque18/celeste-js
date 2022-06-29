import {
    SET_WEB3_INSTANCE,
    ADD_WEB3_READONLY_INSTANCE,
    ADD_CONTRACT,
    REMOVE_CONTRACT,
    SET_INITIALIZED,
    SET_READONLY_INITIALIZED,
} from '../constants';

export const set_web3_instance = web3Instance => ({
    type: SET_WEB3_INSTANCE,
    payload: web3Instance,
});

export const add_web3_readonly_instance = (chainId, web3instance) => ({
    type: ADD_WEB3_READONLY_INSTANCE,
    payload: { chainId, web3instance },
});

export const add_contract = (key, contract) => ({
    type: ADD_CONTRACT,
    payload: { key, contract },
});

export const remove_contract = key => ({
    type: REMOVE_CONTRACT,
    payload: key,
});

export const set_initialized = value => ({
    type: SET_INITIALIZED,
    payload: value,
});

export const set_readonly_initialized = value => ({
    type: SET_READONLY_INITIALIZED,
    payload: value,
});
