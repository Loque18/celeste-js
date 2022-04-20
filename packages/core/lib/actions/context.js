import IActionsStrategy from './strategies/IActionsStrategy';

class Context {
    #strategy = { ...IActionsStrategy };

    setStraegy(strategy) {
        this.#strategy = strategy;
    }

    requestConnection(provider) {
        return this.#strategy.requestConnection(provider);
    }

    requestDisconnection(provider) {
        return this.#strategy.requestDisconnection(provider);
    }
}

export default Context;
