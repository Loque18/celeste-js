import Web3 from 'web3';

const getReadOnlyWeb3 = rpc => {
    const { chainId, url } = rpc;
    const web3 = new Web3(url);
    return web3;
    // store.dispatch(set_web3_read_instance(chainName, chainId, web3));
};

export default getReadOnlyWeb3;
