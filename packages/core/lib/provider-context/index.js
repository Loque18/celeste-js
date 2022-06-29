import IActionsStrategy from './strategies/IActionsStrategy';

class ProviderContext {
    #strategy = { ...IActionsStrategy };

    setStrategy(strategy) {
        this.#strategy = strategy;
    }

    getProvider(rpcs) {
        return this.#strategy.getProvider(rpcs);
    }

    async requestConnection(provider) {
        await this.#strategy.requestConnection(provider);
    }

    async requestDisconnection(provider) {
        await this.#strategy.requestDisconnection(provider);
    }

    async requestChangeNetwork(provider, chainId) {
        await this.#strategy.requestChangeNetwork(provider, chainId);
    }

    async getPreviousSession(provider) {
        const res = await this.#strategy.getPreviousSession(provider);
        return res;
    }
}

export default ProviderContext;
