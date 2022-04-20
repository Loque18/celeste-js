import IActionsStrategy from './strategies/IActionsStrategy';

class Context {
    #strategy = { ...IActionsStrategy };

    setStraegy(strategy) {
        this.#strategy = strategy;
    }

    async requestConnection(provider) {
        return this.#strategy.requestConnection(provider);
    }

    async requestDisconnection(provider) {
        return this.#strategy.requestDisconnection(provider);
    }
}

export default Context;
