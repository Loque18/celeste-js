import walletReducer from '../lib/reducers/walletReducer';
import * as actions from '../lib/actions';

// prettier-ignore
const { 
    set_chain_id,
    set_provider_wallet,
    set_address,
    set_login_status
} = actions;

const defaultState = {
    providerWallet: null,
    address: null,
    chainId: null,
    isLoggedIn: false,
};

describe('web3 reducer', () => {
    it('should return the initial state', () => {
        expect(walletReducer(undefined, {})).toEqual(defaultState);
    });

    it('should set the wallet provider', () => {
        const action = set_provider_wallet('metamask');
        const previousState = defaultState;
        const nextState = walletReducer(previousState, action);

        expect(nextState).toEqual({
            ...previousState,
            providerWallet: 'metamask',
        });
    });

    it('should set the wallet address', () => {
        const action = set_address(
            '0x1234567890123456789012345678901234567890'
        );
        const previousState = defaultState;
        const nextState = walletReducer(previousState, action);

        expect(nextState).toEqual({
            ...previousState,
            address: '0x1234567890123456789012345678901234567890',
        });
    });

    it('should set the chain id', () => {
        const action = set_chain_id(1);
        const previousState = defaultState;
        const nextState = walletReducer(previousState, action);

        expect(nextState).toEqual({
            ...previousState,
            chainId: 1,
        });
    });

    it('should log in', () => {
        const action = set_login_status(true);
        const previousState = defaultState;
        const nextState = walletReducer(previousState, action);

        expect(nextState).toEqual({
            ...previousState,
            isLoggedIn: true,
        });
    });
});
