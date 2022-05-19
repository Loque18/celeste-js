/* eslint-disable no-unused-vars */
const IActionsStrategy = {
    requestConnection: async provider => {
        throw new Error('Not implemented');
    },
    requestDisconnection: async provider => {
        throw new Error('Not implemented');
    },
    requestChangeNetwork: async (provider, chainId) => {
        throw new Error('Not implemented');
    },
    getProvider: rpcs => {
        throw new Error('Not implemented');
    },
    getConnection: async provider => {
        throw new Error('Not implemented');
    },
    events: {
        accountsChanged: accounts => {
            console.warn('event accountsChanged not implemented');
        },
        chainChanged: chainId => {
            console.warn('event accountsChanged not implemented');
        },
        disconnect: args => {
            console.warn('event accountsChanged not implemented');
        },
        connect: args => {
            console.warn('event accountsChanged not implemented');
        },
    },
};

export default IActionsStrategy;
