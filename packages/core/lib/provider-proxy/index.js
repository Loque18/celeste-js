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

    // events
    // registerEvents(customEvents = null) {
    //     const ethereum = this.#providers[providers.INJECTED];
    //     const walletconnect = this.#providers[providers.CONNECTED];

    //     if (ethereum) {
    //         // clear previous listeners
    //         ethereum.removeAllListeners();

    //         ethereum.on('accountsChanged', accounts => {
    //             if (this.#currentType !== providers.INJECTED) return;

    //             // call celeste event callback
    //             this.#context.onAccountsChanged(accounts);

    //             if (customEvents && customEvents.accountsChanged)
    //                 customEvents.accountsChanged(accounts, ethereum);
    //         });

    //         ethereum.on('chainChanged', chainId => {
    //             if (this.#currentType !== providers.INJECTED) return;

    //             const decimalChainId = parseInt(+chainId, 10);

    //             // call celeste event callback
    //             this.#context.onChainChanged(decimalChainId);

    //             if (customEvents && customEvents.chainChanged) {
    //                 customEvents.chainChanged(decimalChainId, ethereum);
    //             }
    //         });

    //         ethereum.on('connect', args => {
    //             if (this.#currentType !== providers.INJECTED) return;
    //             this.#context.onConnect(args);
    //         });

    //         ethereum.on('disconnect', error => {
    //             if (this.#currentType !== providers.INJECTED) return;
    //             this.#context.onDisconnect(error);
    //         });
    //     }

    //     if (walletconnect) {
    //         walletconnect.removeAllListeners();

    //         walletconnect.on('accountsChanged', accounts => {
    //             if (this.#currentType !== providers.CONNECTED) return;
    //             this.#context.onAccountsChanged(accounts);

    //             if (customEvents && customEvents.accountsChanged)
    //                 customEvents.accountsChanged(accounts, walletconnect);
    //         });

    //         walletconnect.on('chainChanged', chainId => {
    //             if (this.#currentType !== providers.CONNECTED) return;
    //             this.#context.onChainChanged(chainId);

    //             if (customEvents && customEvents.chainChanged)
    //                 customEvents.chainChanged(chainId, walletconnect);
    //         });

    //         walletconnect.on('disconnect', (code, reason) => {
    //             if (this.#currentType !== providers.CONNECTED) return;
    //             this.#context.onDisconnect({ code, reason });

    //             if (customEvents && customEvents.disconnect)
    //                 customEvents.disconnect({ code, reason }, walletconnect);
    //         });
    //     }
    // }

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
