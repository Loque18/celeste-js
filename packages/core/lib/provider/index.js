import { InjectedProviderFactory, ConnectedProviderFactory } from './factories';

import { providers } from '../contants';

class ProviderHandler {
    #type;

    constructor(type) {
        if (!Object.values(providers).includes(type)) {
            throw new Error('Invalid provider type');
        }

        this.#type = type;
    }

    async getProvider(rpc) {
        let providerFactory;

        if (this.#type === providers.INJECTED)
            providerFactory = InjectedProviderFactory();
        else if (this.#type === providers.CONNECTED)
            providerFactory = ConnectedProviderFactory();

        const provider = await providerFactory.create(rpc);

        return provider;
    }
}

export default ProviderHandler;
