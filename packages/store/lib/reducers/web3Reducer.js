import {
    SET_WEB3_INSTANCE,
    SET_WEB3_READONLY_INSTANCE,
    SET_INITIALIZED,
    SET_READONLY_INITIALIZED,
    ADD_CONTRACT,
} from '../constants';

const defaultState = {
    web3: null,
    web3readonly: null,
    initialized: false,
    readonly_initialized: false,
    contracts: [],
};

// eslint-disable-next-line default-param-last
const reducer = (state = defaultState, { type, payload }) => {
    switch (type) {
        case SET_WEB3_INSTANCE:
            return {
                ...state,
                web3: payload,
            };

        case SET_WEB3_READONLY_INSTANCE:
            return {
                ...state,
                web3readonly: {
                    [payload.chainId]: payload.web3instance,
                },
            };

        case SET_INITIALIZED:
            return {
                ...state,
                initialized: payload,
            };

        case SET_READONLY_INITIALIZED:
            return {
                ...state,
                readonly_initialized: payload,
            };

        case ADD_CONTRACT: {
            return {
                ...state,
                contracts: {
                    ...state.contracts,
                    [payload.key]: payload.contract,
                },
            };
        }

        default:
            return { ...state };
    }
};

export default reducer;
