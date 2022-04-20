import { getConnectedProvider } from './providers/connected';
import { getInjectedProvider } from './providers/injected';

const AbstractProviderMethodsFactory = {
    createMethods: () => {
        throw new Error('Not implemented');
    },
};

function ConnectedProviderMethodsFactory() {
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
