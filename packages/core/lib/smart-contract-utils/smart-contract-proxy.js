const SmartContractProxy = contract => {
    return {
        read: async contractName => {
            const { web3 } = web3reducer;

            const contract = new web3.eth.Contract(
                contracts[contractName].abi,
                contracts[contractName].address
            );

            return await contract.methods;
        },

        write: async (contractName, methodName, ...args) => {
            const { web3 } = web3reducer;

            const contract = new web3.eth.Contract(
                contracts[contractName].abi,
                contracts[contractName].address
            );

            return await contract.methods[methodName](...args).send({
                from: web3.eth.defaultAccount,
            });
        },
    };
};
