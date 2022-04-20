/* eslint-disable func-names */
const SmartContractFactory = function (web3Instance) {
    return {
        create: (abi, address) => new web3Instance.eth.Contract(abi, address),
    };
};

export default SmartContractFactory;
