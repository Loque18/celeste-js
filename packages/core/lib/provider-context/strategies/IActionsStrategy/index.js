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
    getPreviousSession: async provider => {
        throw new Error('Not implemented');
    },
};

export default IActionsStrategy;
