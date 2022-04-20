/* eslint-disable import/no-unresolved */
import store from 'lib/store';
import * as actions from '../lib/actions';
import web3Reducer from 'lib/reducers/web3Reducer';

const { set_web3_instance, set_web3_readonly_instance } = actions;

const defaultState = {
    web3: null,
    web3readonly: null,
    initialized: false,
    readonly_initialized: false,
    contracts: [],
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

    it('should handle a web3 readonly instance being added to the reducer', () => {
        const web3readonly_instance = 'web3readonly_instance';
        const action = set_web3_readonly_instance(web3readonly_instance);
        const previousState = defaultState;
        const nextState = web3Reducer(previousState, action);

        expect(nextState).toEqual({
            ...previousState,
            web3readonly: web3readonly_instance,
        });
    });
});
