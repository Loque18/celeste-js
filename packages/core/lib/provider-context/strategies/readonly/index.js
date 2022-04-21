import IActionsStrategy from '../IActionsStrategy';

const getProvider = rpc => rpc.url;

function ReadonlyStrategy() {
    return {
        ...IActionsStrategy,
        getProvider,
    };
}

export default ReadonlyStrategy;
