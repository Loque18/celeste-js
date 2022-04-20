import getConnectedProvider from '../provider-types/connected';
import getInjectedProvider from '../provider-types/injected';

const AbstractProviderFactory = {
    // eslint-disable-next-line no-unused-vars
    create: () => {
        throw new Error('Not implemented');
    },
};

function ConnectedProviderFactory() {
    return {
        ...AbstractProviderFactory,
        create: getConnectedProvider,
    };
}

function InjectedProviderFactory() {
    return {
        ...AbstractProviderFactory,
        create: getInjectedProvider,
    };
}

export { ConnectedProviderFactory, InjectedProviderFactory };
