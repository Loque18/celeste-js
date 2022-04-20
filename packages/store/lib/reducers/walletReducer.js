import {
    // REQUEST_CONNECTION,
    SET_RROVIDER_WALLET,
    SET_CHAIN_ID,
    SET_ADDRESS,
    SET_LOGIN_STATUS,
} from '../constants';

const defaultState = {
    providerWallet: null,
    address: null,
    chainId: null,
    isLoggedIn: false,
};

// eslint-disable-next-line default-param-last
const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_RROVIDER_WALLET:
            return {
                ...state,
                providerWallet: action.payload,
            };

        case SET_CHAIN_ID:
            return {
                ...state,
                chainId: action.payload,
            };

        case SET_ADDRESS:
            return {
                ...state,
                address: action.payload,
            };

        case SET_LOGIN_STATUS:
            return {
                ...state,
                isLoggedIn: action.payload,
            };

        default:
            return { ...state };
    }
};

export default reducer;
