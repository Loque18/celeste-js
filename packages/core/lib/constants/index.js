/* eslint-disable import/prefer-default-export */
const providers = {
    INJECTED: 'INJECTED',
    CONNECTED: 'CONNECTED',
};

const events = {
    ACCOUNTS_CHANGED: 'accountsChanged',
    CHAIN_CHANGED: 'chainChanged',
    DISCONNECT: 'disconnect',
    CONNECTED_TO_WALLLET: 'connectedToWallet',
    DISCONNECTED_FROM_WALLLET: 'disconnectedFromWallet',
};

export { providers, events };
