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
    }    
};

export default IActionsStrategy;
