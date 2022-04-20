/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const fs = require('fs');
const path = require('path');

// Utils shamefully stolen from
// https://github.com/dominictarr/rc/blob/master/lib/utils.js

function findStartingWith(start, rel) {
    const file = path.join(start, rel);

    try {
        fs.statSync(file);
        return file;
    } catch (err) {
        // They are equal for root dir
        if (path.dirname(start) !== start) {
            return findStartingWith(path.dirname(start), rel);
        }
    }

    return undefined;
}

function find(...args) {
    const rel = path.join.apply(null, [].slice.call(args));
    return findStartingWith(path.dirname(process.mainModule.filename), rel);
}

// Find the rc file path

const getConfig = () => {
    const configFilePath = find('celeste.config.js');

    if (!configFilePath) {
        throw new Error('celeste JS: Cannot find celeste.config.js');
    }

    const config = require(configFilePath);

    return config;
};

export default getConfig;
