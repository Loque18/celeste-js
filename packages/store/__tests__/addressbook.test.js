import addressBookReducer from '../lib/reducers/addressBookReducer';
import * as actions from '../lib/actions';

const { add_address } = actions;

// prettier-ignore
const defaultState = {
    addressBook: {},
};

describe('web3 reducer', () => {
    it('should return the initial state', () => {
        expect(addressBookReducer(undefined, {})).toEqual(defaultState);
    });

    it('should add an address to the address book', () => {
        const action = add_address('<key>', '<address>');
        const previousState = defaultState;
        const nextState = addressBookReducer(previousState, action);

        expect(nextState).toEqual({
            ...previousState,
            addressBook: {
                '<key>': '<address>',
            },
        });
    });
});
