/* eslint-disable no-unused-vars */
const IActionsStrategy = {
    requestConnection: async provider => {
        throw new Error('Not implemented');
    },
    requestDisconnection: async provider => {
        throw new Error('Not implemented');
    },
    getProvider: rpc => {
        throw new Error('Not implemented');
    },
    getConnection: async provider => {
        throw new Error('Not implemented');
    },
    events: {
        accountsChanged: accounts => {
            console.log('accountsChanged', accounts);
        },
        chainChanged: chainId => {
            console.log('chainChanged', chainId);
        },
        disconnected: args => {
            console.log('disconnected', args);
        },
        connected: args => {
            console.log('connected', args);
        },
    },
};

export default IActionsStrategy;
