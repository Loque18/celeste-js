import {
    getConnectedProvider,
    requestConection as requestConnectedConnection,
} from '../types/connected';
import {
    getInjectedProvider,
    requestConection as requestInjectedConection,
} from '../types/injected';

const AbstractProviderFactory = {
    // eslint-disable-next-line no-unused-vars
    create: () => {
        throw new Error('Not implemented');
    },
};

function ConnectedProviderFactory() {
    return {
        ...AbstractProviderFactory,
        create: () => ({
            getProvider: getConnectedProvider,
            requestConection: requestConnectedConnection,
        }),
    };
}

function InjectedProviderFactory() {
    return {
        ...AbstractProviderFactory,
        create: () => ({
            getProvider: getInjectedProvider,
            requestConection: requestInjectedConection,
        }),
    };
}

export { ConnectedProviderFactory, InjectedProviderFactory };
