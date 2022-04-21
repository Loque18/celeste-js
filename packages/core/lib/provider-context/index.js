import IActionsStrategy from './strategies/IActionsStrategy';

class ProviderContext {
    #strategy = { ...IActionsStrategy };

    setStrategy(strategy) {
        this.#strategy = strategy;
    }

    async getProvider(rpc) {
        return this.#strategy.getProvider(rpc);
    }

    async requestConnection(provider) {
        await this.#strategy.requestConnection(provider);
    }

    async requestDisconnection(provider) {
        await this.#strategy.requestDisconnection(provider);
    }
}

export default ProviderContext;
