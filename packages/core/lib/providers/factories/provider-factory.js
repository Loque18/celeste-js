import { getConnectedProvider } from './providers/connected';
import { getInjectedProvider } from './providers/injected';

const AbstractProviderFactory = {
    create: () => {
        throw new Error('Not implemented');
    },
};

function ConnectedProviderFactory() {
    return {
        ...AbstractProviderFactory,
        create: () => getConnectedProvider(),
    };
}

function InjectedProviderFactory() {
    return {
        ...AbstractProviderFactory,
        create: () => getInjectedProvider(),
    };
}

export { ConnectedProviderFactory, InjectedProviderFactory };
