import { providers } from '../contants';

import ProviderContext from '../provider-context';
import StrategiesMap from '../provider-context/strategies';

import { validateProviderType } from '../validators';

class ProviderProxy {
    #currentType;

    #context;

    #providers = {};

    constructor(rpc) {
        this.#currentType = providers.READONLY;

        this.#context = new ProviderContext();

        // get all type of providers
        Object.values(providers).forEach(providerType => {
            this.#context.setStrategy(new StrategiesMap[providerType]());

            try {
                this.#providers[providerType] = this.#getProvider(rpc);
            } catch (e) {
                // lo
                console.log(`Provider of type ${providerType} not found`);
                this.#providers[providerType] = null;
            }
        });

        // set readonly provider as default
        this.#context.setStrategy(providers.READONLY);
    }

    // api

    setType(type) {
        validateProviderType(type);
        this.#currentType = type;
        this.#context.setStrategy(new StrategiesMap[type]());
    }

    // proxy

    #getProvider(rpc) {
        const provider = this.#context.getProvider(rpc);
        return provider;
    }

    getProvider(type) {
        validateProviderType(type);
        return this.#providers[type];
    }

    async requestConnection() {
        await this.#context.requestConnection(
            this.#providers[this.#currentType]
        );
    }

    async requestDisconnection() {
        await this.#context.requestDisconnection(
            this.#providers[this.#currentType]
        );
    }

    async getConnection() {
        const connection = await this.#context.getConnection(
            this.#providers[this.#currentType]
        );
        return connection;
    }
}

export default ProviderProxy;
