import { ADD_ADDRESS } from '../constants';

const defaultState = {
    addressBook: {},
};

/* eslint-disable default-param-last */
const reducer = (state = defaultState, { type, payload }) => {
    switch (type) {
        case ADD_ADDRESS:
            return {
                ...state,
                addressBook: {
                    ...state.addressBook,
                    [payload.key]: payload.address,
                },
            };

        default:
            return { ...state };
    }
};

export default reducer;
