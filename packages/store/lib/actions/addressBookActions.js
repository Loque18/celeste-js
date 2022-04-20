/* eslint-disable import/prefer-default-export */
import { ADD_ADDRESS } from '../constants';

export const add_address = (key, address) => ({
    type: ADD_ADDRESS,
    payload: { key, address },
});
