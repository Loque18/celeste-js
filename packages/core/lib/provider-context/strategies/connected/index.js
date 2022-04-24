import { store as celesteStore, actions } from '@celeste-js/store';

import Web3 from 'web3';
import WalletConnectProvider from '@walletconnect/web3-provider';

import IActionsStrategy from '../IActionsStrategy';

const getProvider = rpc => {
    const provider = new WalletConnectProvider({
        rpc: {
            [+rpc.chainId]: rpc.url,
        },
    });

    return provider;
};

const requestConnection = async provider => {
    await provider.enable();
};

const requestDisconnection = async provider => {
    await provider.disconnect();
};

const requestChangeNetwork = async (provider, chainId) => {
    throw new Error(`Please change to network ${chainId}`);
};

const getConnection = async provider => {
    if (!provider.connector.connected) return null;
    await provider.enable();

    const web3 = new Web3(provider);

    const accounts = await web3.eth.getAccounts();

    if (accounts.length === 0) return null;

    return {
        accounts,
        web3,
    };
};

const {
    set_address,
    set_login_status,
    set_web3_instance,
    set_chain_id,
    set_initialized,
    set_provider_wallet,
} = actions;

const events = {
    accountsChanged: accounts => {
        if (accounts.length > 0) {
            celesteStore.dispatch(set_address(accounts[0]));
        } else {
            celesteStore.dispatch(set_login_status(false));
            celesteStore.dispatch(set_address(null));
        }
    },
    chainChanged: chainId => {
        celesteStore.dispatch(set_chain_id(chainId));
    },
    disconnect: args => {
        const { code } = args;

        if (code === 1000) {
            celesteStore.dispatch(set_login_status(false));
            celesteStore.dispatch(set_address(null));
            celesteStore.dispatch(set_web3_instance(null));
            celesteStore.dispatch(set_chain_id(null));
            celesteStore.dispatch(set_initialized(false));
            celesteStore.dispatch(set_provider_wallet(null));
            return null;
        }

        throw new Error(args);
    },
};

function ConnectedActionsStrategy() {
    return {
        ...IActionsStrategy,
        getProvider,
        requestConnection,
        requestDisconnection,
        requestChangeNetwork,
        getConnection,
        events: {
            ...IActionsStrategy.events,
            ...events,
        },
    };
}

export default ConnectedActionsStrategy;
