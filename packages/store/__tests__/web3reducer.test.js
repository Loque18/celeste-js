import web3Reducer from '../lib/reducers/web3Reducer';
import * as actions from '../lib/actions';

const {
    set_web3_instance,
    add_web3_readonly_instance,
    set_initialized,
    set_readonly_initialized,
    add_contract,
    remove_contract,
} = actions;

const defaultState = {
    web3: null,
    web3readonly: null,
    initialized: false,
    readonly_initialized: false,
    contracts: {},
};

describe('web3 reducer', () => {
    it('should return the initial state', () => {
        expect(web3Reducer(undefined, {})).toEqual(defaultState);
    });

    it('should handle a web3 instance being added to the reducer', () => {
        const action = set_web3_instance('web3_instance');
        const previousState = defaultState;
        const nextState = web3Reducer(previousState, action);

        expect(nextState).toEqual({
            ...previousState,
            web3: 'web3_instance',
        });
    });

    it('should handle two web3 readonly instance being added to the reducer', () => {
        const web3readonly_instance1 = '<instance1>';
        const chainId1 = '<chainId_1>';

        const web3readonly_instance2 = '<instance2>';
        const chainId2 = '<chainId_2>';

        const action = add_web3_readonly_instance(
            chainId1,
            web3readonly_instance1
        );
        const previousState = defaultState;
        const nextState = web3Reducer(previousState, action);

        expect(nextState).toEqual({
            ...previousState,
            web3readonly: {
                [chainId1]: web3readonly_instance1,
            },
        });

        const action2 = add_web3_readonly_instance(
            chainId2,
            web3readonly_instance2
        );

        const nextState2 = web3Reducer(nextState, action2);

        expect(nextState2).toEqual({
            ...nextState,
            web3readonly: {
                [chainId1]: web3readonly_instance1,
                [chainId2]: web3readonly_instance2,
            },
        });
    });

    it('should be initialized', () => {
        const action = set_initialized(true);
        const previousState = defaultState;
        const nextState = web3Reducer(previousState, action);

        expect(nextState).toEqual({
            ...previousState,
            initialized: true,
        });
    });

    it('should be readonly initialized', () => {
        const action = set_readonly_initialized(true);
        const previousState = defaultState;
        const nextState = web3Reducer(previousState, action);

        expect(nextState).toEqual({
            ...previousState,
            readonly_initialized: true,
        });
    });

    it('should add a contract to the reducer and then rmeove it', () => {
        const contract = {
            abi: '<abi>',
            address: '<address>',
        };
        const key = '<key>';

        const action = add_contract(key, contract);
        const previousState = defaultState;
        const nextState = web3Reducer(previousState, action);

        expect(nextState).toEqual({
            ...previousState,
            contracts: {
                [key]: contract,
            },
        });

        const action2 = remove_contract(key);
        const nextState2 = web3Reducer(nextState, action2);

        expect(nextState2).toEqual({
            ...nextState,
            contracts: {},
        });
    });
});
