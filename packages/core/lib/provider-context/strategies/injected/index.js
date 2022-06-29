import Web3 from 'web3';
import IActionsStrategy from '../IActionsStrategy';

const getProvider = () => {
    const injected = window.ethereum;

    if (injected) return injected;

    throw new Error('No injected provider detected');
};

const requestConnection = async provider => {
    if (provider == null) {
        window.open('https://metamask.io/', '_blank');
        return;
    }

    await provider.request({
        method: 'eth_requestAccounts',
    });
};

const requestDisconnection = async () => {};

const requestChangeNetwork = async (provider, chainId) => {
    await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }], // chainId must be in hexadecimal numbers
    });
};

const getPreviousSession = async provider => {
    if (provider === null) return null;
    const web3 = new Web3(provider);

    const accounts = await web3.eth.getAccounts();

    if (accounts.length === 0) return null;

    return provider;
};

function InjectedProviderStrategy() {
    return {
        ...IActionsStrategy,
        requestConnection,
        getProvider,
        getPreviousSession,
        requestDisconnection,
        requestChangeNetwork,
    };
}

export default InjectedProviderStrategy;
