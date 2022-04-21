import { providers } from '../contants';

import ProviderContext from '../provider-context';
import StrategiesMap from '../provider-context/strategies';

import {validateProviderType} from '../validators';


class ProviderProxy {
    #currentType;

    #context;

    #providers = {};

    constructor(rpc) {
        
        this.#currentType = providers.READONLY;

        this.#context = new ProviderContext();        
        
        // get all type of providers
        Object.values(providers).forEach(async providerType => {
            this.#context.setStrategy(new StrategiesMap[providerType]());
            this.#providers[providerType] = await this.#getProvider(rpc);
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

    async #getProvider(rpc) {
        const provider = await this.#context.getProvider(rpc);
        return provider;
    }

    async requestConnection() {
        await this.#context.requestConnection(this.#providers[this.#currentType]);
    }

    async requestDisconnection() {
        await this.#context.requestDisconnection(this.#providers[this.#currentType]);
    }
}

export default ProviderProxy;
