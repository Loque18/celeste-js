/* eslint-disable no-unused-vars */
const IActionsStrategy = {
    requestConnection: async provider => {
        throw new Error('Not implemented');
    },
    requestDisconnection: async provider => {
        throw new Error('Not implemented');
    },
    getProvider: async rpc => {
        throw new Error('Not implemented');
    },
};

export default IActionsStrategy;
