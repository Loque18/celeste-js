import IActionsStrategy from '../IActionsStrategy';

const requestConnection = async provider => {
    provider.request({
        method: 'eth_requestAccounts',
    });
};

const requestDisconnection = async () => {};

function InjectedProviderStrategy() {
    return {
        ...IActionsStrategy,
        requestConnection,
        requestDisconnection,
    };
}

export default InjectedProviderStrategy;
