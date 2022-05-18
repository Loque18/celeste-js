import { store as celesteStore } from '@celeste-js/store';

import { providers } from '../constants';

const validateProviderType = providerType => {
    if (!providerType)
        throw new Error('celeste JS: providerType must be specified');
    if (!providers[providerType])
        throw new Error(
            `celeste JS: providerType ${providerType} is not supported`
        );
};

const validateConfig = config => {
    const { rpcs, smartContracts } = config;

    // prettier-ignore
    if(!rpcs) throw new Error('celeste JS: rpc must be specified in celeste.config.js');

    if (Object.keys(rpcs).length === 0)
        throw new Error(
            'celeste JS: config rpcs must contain at least one element'
        );

    // prettier-ignore
    if(smartContracts){
        if(!Array.isArray(smartContracts)){
            throw new Error('celeste JS: smartContracts must be specified in celeste.config.js');
        }
    }
};

const validateIfLoggedIn = () => {
    const { isLoggedIn } = celesteStore.getState().walletReducer;

    if (isLoggedIn) {
        // eslint-disable-next-line no-console
        // console.warn('celeste JS: you are already logged in');
        return true;
    }

    return false;
};

const validateChainId = chainId => {
    if (typeof chainId !== 'number' || chainId < 0)
        throw new Error('celeste JS: chainId must be a number greater than 0');
};

export {
    validateProviderType,
    validateConfig,
    validateIfLoggedIn,
    validateChainId,
};
