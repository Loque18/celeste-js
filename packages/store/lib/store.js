import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import web3Reducer from './reducers/web3Reducer';
import walletReducer from './reducers/walletReducer';
import addressBookReducer from './reducers/addressBookReducer';

const reducer = combineReducers({
    web3Reducer,
    walletReducer,
    addressBookReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
