import IActionsStrategy from './strategies/IActionsStrategy';

class ProviderContext {
    #strategy = { ...IActionsStrategy };

    setStrategy(strategy) {
        this.#strategy = strategy;
    }

    getProvider(rpc) {
        return this.#strategy.getProvider(rpc);
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

    async getConnection(provider) {
        const res = await this.#strategy.getConnection(provider);
        return res;
    }

    /* *~~*~~*~~*~~*~~* EVENTS ~~*~~*~~*~~*~~* */

    onAccountsChanged(accounts) {
        this.#strategy.events.accountsChanged(accounts);
    }

    onChainChanged(chainId) {
        this.#strategy.events.chainChanged(chainId);
    }

    onDisconnect(args) {
        this.#strategy.events.disconnect(args);
    }

    onConnect(args) {
        this.#strategy.events.connect(args);
    }
}

export default ProviderContext;
