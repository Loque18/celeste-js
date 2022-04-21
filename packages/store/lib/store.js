import { createStore, combineReducers } from 'redux';

import web3Reducer from './reducers/web3Reducer';
import walletReducer from './reducers/walletReducer';
import addressBookReducer from './reducers/addressBookReducer';

const reducer = combineReducers({
    web3Reducer,
    walletReducer,
    addressBookReducer,
});

const store = createStore(reducer);

export default store;
