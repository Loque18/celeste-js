import { InjectedProviderFactory, ConnectedProviderFactory } from './factories';

class ProviderHandler {
    #type;
    #providerMethods;

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

        const providerMethods = await providerFactory.create();

        this.#providerMethods = providerMethods;

        const provider = await providerMethods.getProvider();

        return provider;
    }

    async requestConection(provider) {
        const { requestConection } = this.#providerMethods;
        await requestConection(provider);
    }
    // async requestDisconnection(provider) {}
}

export default ProviderHandler;
