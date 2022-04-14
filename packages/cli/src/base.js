import fs from 'fs';
import path from 'path';

// const jsonsInDir = fs
//     .readdirSync('./sw_lbi/categories')
//     .filter(file => path.extname(file) === '.json');

// jsonsInDir.forEach(file => {
//     const fileData = fs.readFileSync(path.join('./sw_lbi/categories', file));
//     const json = JSON.parse(fileData.toString());
// });

const loadAbis = directory => {
    const abis = {};
    try {
        const absoluteDir = path.resolve(__dirname, directory);
        console.log(absoluteDir);
    } catch (e) {
        console.log(e);
    }
    // files.forEach(file => {
    //     const fileData = fs.readFileSync(path.join(directory, file));
    //     const json = JSON.parse(fileData.toString());
    //     abis[json.name] = json;
    // });
    return abis;
};

const genereateTemplate = (chain, abiArg) => {
    const abis = loadAbis(abiArg);

    return `
module.exports = {
    rpc: {
        chainName: '${chain.name || ''}',
        chainId: '${chain.id || ''}',
        url: '${chain.url || ''}',
    },
    smartContracts: [],
    addressBook: {},
};
`;
};

export default genereateTemplate;
