import { providers } from '../constants';

import ProviderContext from '../provider-context';
import StrategiesMap from '../provider-context/strategies';

import { validateProviderType } from '../validators';

class ProviderProxy {
    #currentType;

    #context;

    #providers = {};

    constructor(rpcs) {
        this.#currentType = providers.INJECTED;

        this.#context = new ProviderContext();

        // get all type of providers
        Object.values(providers).forEach(providerType => {
            // instantiate strategies
            this.#context.setStrategy(new StrategiesMap[providerType]());

            try {
                // instantiate providers
                this.#providers[providerType] = this.#context.getProvider(rpcs);
            } catch (e) {
                // handle error
                // eslint-disable-next-line no-console
                console.warn(`Provider of type ${providerType} not found`);

                this.#providers[providerType] = null;
            }
        });

        // set injected provider as default
        this.#context.setStrategy(providers.INJECTED);

        // register events
        // this.registerEvents();
    }

    // api
    setType(type) {
        validateProviderType(type);
        this.#currentType = type;
        this.#context.setStrategy(new StrategiesMap[type]());
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

    async requestChangeNetwork(chainId) {
        await this.#context.requestChangeNetwork(
            this.#providers[this.#currentType],
            chainId
        );
    }

    async getPreviousSession() {
        const connection = await this.#context.getPreviousSession(
            this.#providers[this.#currentType]
        );
        return connection;
    }
}

export default ProviderProxy;
