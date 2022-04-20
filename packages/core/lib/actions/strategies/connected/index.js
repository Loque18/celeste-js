import IActionsStrategy from '../IActionsStrategy';

const requestConnection = async provider => {
    await provider.enable();
};

const requestDisconnection = async provider => {
    await provider.disconnect();
};

function ConnectedActionsStrategy() {
    return {
        ...IActionsStrategy,
        requestConnection,
        requestDisconnection,
    };
}

export default ConnectedActionsStrategy;
