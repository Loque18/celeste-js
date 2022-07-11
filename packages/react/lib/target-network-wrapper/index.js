/* eslint-disable eqeqeq */
import React from 'react';
import PropTypes from 'prop-types';

import { useCelesteSelector } from '../celeste-store-provider';

const TargetNetworkWrapper = ({ children, info, network }) => {
    const { walletReducer } = useCelesteSelector(state => state);

    // prettier-ignore
    return +walletReducer.chainId === +network ? (
        children
    ) : (
        <div>{info}</div>
    );
};

TargetNetworkWrapper.propTypes = {
    children: PropTypes.node,
    info: PropTypes.element,
    network: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
};

export default TargetNetworkWrapper;
