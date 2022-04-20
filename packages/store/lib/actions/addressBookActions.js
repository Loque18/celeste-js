/* eslint-disable import/prefer-default-export */
import { ADD_ADDRESS } from '../constants';

export const add_address = address => ({ type: ADD_ADDRESS, payload: address });
