/* eslint-disable eqeqeq */
import React from 'react';
import PropTypes from 'prop-types';

import { useCelesteSelector } from '../celeste-store-provider';
import { useCeleste } from '../celeste-provider';

const NetworkWrapper = ({ children, info }) => {
    const celeste = useCeleste();

    const { walletReducer } = useCelesteSelector(state => state);

    // prettier-ignore
    return Object.keys(celeste.configread.rpc).includes(walletReducer.chainId.toString()) ? (
        children
    ) : (
        <div>{info}</div>
    );
};

NetworkWrapper.propTypes = {
    children: PropTypes.node,
    info: PropTypes.element,
};

export default NetworkWrapper;
