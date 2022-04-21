import { providers } from "../contants";

const validateProviderType = providerType => {
    if(!providerType) throw new Error('celeste JS: providerType must be specified');
    if(!providers[providerType]) throw new Error(`celeste JS: providerType ${providerType} is not supported`);
};

const validateConfig = config => {
    const { rpc, smartContracts } = config;

    // prettier-ignore
    if(!rpc) throw new Error('celeste JS: rpc must be specified in celeste.config.js');

    // prettier-ignore
    if(smartContracts && !Array.isArray(smartContracts))
        throw new Error('celeste JS: smartContracts must be specified in celeste.config.js');
};

export {
    validateProviderType,
    validateConfig,
};