import { providers } from '../contants';

import ProviderContext from '../provider-context';
import InjectedActionsStrategy from '../provider-context/strategies/injected';
import ConnectedActionsStrategy from '../provider-context/strategies/connected';
import ReadonlyStrategy from '../provider-context/strategies/readonly';

const StrategiesMap = {
    [providers.INJECTED]: InjectedActionsStrategy,
    [providers.CONNECTED]: ConnectedActionsStrategy,
    [providers.READONLY]: ReadonlyStrategy,
};

class ProviderProxy {
    #type;

    #context;

    provider;

    constructor(type) {
        if (!Object.values(providers).includes(type)) {
            throw new Error('Invalid provider type');
        }
        this.#type = type;

        this.#context = new ProviderContext();
        this.#context.setStrategy(new StrategiesMap[type]());
    }

    setType(type) {
        if (!Object.values(providers).includes(type)) {
            throw new Error('Invalid provider type');
        }
        this.#type = type;
        this.#context.setStrategy(new StrategiesMap[type]());
    }

    async getProvider(rpc) {
        const provider = await this.#context.getProvider(rpc);
        this.provider = provider;
        return provider;
    }

    async requestConnection() {
        await this.#context.requestConnection(this.provider);
    }

    async requestDisconnection() {
        await this.#context.requestDisconnection(this.provider);
    }
}

export default ProviderProxy;
