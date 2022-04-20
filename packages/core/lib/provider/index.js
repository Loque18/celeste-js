import { InjectedProviderFactory, ConnectedProviderFactory } from './factories';

class ProviderHandler {
    #type;

    constructor(type) {
        if (type !== 'injected' || type !== 'walletconnect') {
            throw new Error('Invalid provider type');
        }

        this.#type = type;
    }

    async getProvider() {
        let providerFactory;

        if (this.#type === 'injected') {
            providerFactory = InjectedProviderFactory();
        } else if (this.#type === 'walletconnect') {
            providerFactory = ConnectedProviderFactory();
        }

        const provider = await providerFactory.create();

        return provider;
    }
}

export default ProviderHandler;
