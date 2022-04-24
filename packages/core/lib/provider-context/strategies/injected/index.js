import { store as celesteStore, actions } from '@celeste-js/store';

import Web3 from 'web3';
import IActionsStrategy from '../IActionsStrategy';

const {
    set_address,
    set_login_status,
    set_web3_instance,
    set_chain_id,
    set_initialized,
    set_provider_wallet,
} = actions;

const getProvider = () => {
    const injected = window.ethereum;

    if (injected) return injected;

    throw new Error('No injected provider detected');
};

const requestConnection = async provider => {
    try {
        await provider.request({
            method: 'eth_requestAccounts',
        });
    } catch (e) {
        throw new Error(e);
    }
};

const requestDisconnection = async () => {
    celesteStore.dispatch(set_login_status(false));
    celesteStore.dispatch(set_web3_instance(null));
    celesteStore.dispatch(set_chain_id(null));
    celesteStore.dispatch(set_initialized(false));
    celesteStore.dispatch(set_provider_wallet(null));
};

const getConnection = async provider => {
    const web3 = new Web3(provider);

    const accounts = await web3.eth.getAccounts();

    if (accounts.length === 0) return null;

    return {
        accounts,
        web3,
    };
};

const events = {
    accountsChanged: accounts => {
        if (accounts.length > 0) {
            celesteStore.dispatch(set_address(accounts[0]));
        } else {
            celesteStore.dispatch(set_login_status(false));
            celesteStore.dispatch(set_address(null));
            celesteStore.dispatch(set_web3_instance(null));
            celesteStore.dispatch(set_chain_id(null));
            celesteStore.dispatch(set_initialized(false));
            celesteStore.dispatch(set_provider_wallet(null));
        }
    },

    chainChanged: chainId => {
        celesteStore.dispatch(set_chain_id(+chainId.toString(16)));
    },

    connect: args => {
        console.log('connect', args);
    },

    disconnecd: args => {
        console.log('disconnect', args);
    },
};

function InjectedProviderStrategy() {
    return {
        ...IActionsStrategy,
        requestConnection,
        getProvider,
        getConnection,
        requestDisconnection,
        events: {
            ...IActionsStrategy.events,
            ...events,
        },
    };
}

export default InjectedProviderStrategy;
