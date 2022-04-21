import IActionsStrategy from './strategies/IActionsStrategy';

class Context {
    #strategy = { ...IActionsStrategy };

    setStrategy(strategy) {
        this.#strategy = strategy;
    }

    async requestConnection(provider) {
        await this.#strategy.requestConnection(provider);
    }

    async requestDisconnection(provider) {
        // await this.#strategy.requestDisconnection(provider);
    }
}

export default Context;
