/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { useCelesteSelector } from '../celeste-store-provider';
import { useCeleste } from '../celeste-provider';

const providers = {
    INJECTED: 'INJECTED',
    CONNECTED: 'CONNECTED',
};

const getAddressReduced = address =>
    `${address.slice(0, 6)}...${address.slice(-4)}`;

const ConnectBtn = ({ className, providerType, children, ...rest }) => {
    const celeste = useCeleste();

    // redux
    const { walletReducer } = useCelesteSelector(state => state);

    const onClick = () => {
        celeste.requestConnection(providerType);
    };

    return (
        <button className={className} onClick={onClick} {...rest}>
            {walletReducer.isLoggedIn && walletReducer.address != null
                ? getAddressReduced(walletReducer.address)
                : children || 'Connect'}
        </button>
    );
};

ConnectBtn.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    providerType: PropTypes.oneOf(Object.values(providers)),
};

export default ConnectBtn;
