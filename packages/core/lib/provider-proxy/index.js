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
            // instantiate strategies
            this.#context.setStrategy(new StrategiesMap[providerType]());

            try {
                // instantiate providers
                this.#providers[providerType] = this.#getProvider(rpc);
            } catch (e) {
                // handle error
                console.log(`Provider of type ${providerType} not found`);

                this.#providers[providerType] = null;
            }
        });

        // set readonly provider as default
        this.#context.setStrategy(providers.READONLY);

        // register events
        this.registerEvents();
    }

    // events
    registerEvents() {
        const ethereum = this.#providers[providers.INJECTED];
        const walletconnect = this.#providers[providers.CONNECTED];

        if (ethereum) {
            ethereum.on('accountsChanged', accounts => {
                if (this.#currentType !== providers.INJECTED) return;
                this.#context.onAccountsChanged(accounts);
            });

            ethereum.on('chainChanged', chainId => {
                if (this.#currentType !== providers.INJECTED) return;
                this.#context.onChainChanged(chainId);
            });

            ethereum.on('connect', args => {
                if (this.#currentType !== providers.INJECTED) return;
                this.#context.onConnect(args);
            });

            ethereum.on('disconnect', error => {
                if (this.#currentType !== providers.INJECTED) return;
                this.#context.onDisconnected(error);
            });
        }

        if (walletconnect) {
            walletconnect.on('accountsChanged', accounts => {
                if (this.#currentType !== providers.CONNECTED) return;
                this.#context.onAccountsChanged(accounts);
            });

            walletconnect.on('chainChanged', chainId => {
                if (this.#currentType !== providers.CONNECTED) return;
                this.#context.onChainChanged(chainId);
            });

            walletconnect.on('disconnect', (code, reason) => {
                if (this.#currentType !== providers.CONNECTED) return;
                this.#context.onDisconnect({ code, reason });
            });
        }
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

    async requestChangeNetwork(chainId) {
        await this.#context.requestChangeNetwork(
            this.#providers[this.#currentType],
            chainId
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
