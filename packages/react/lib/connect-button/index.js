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

const ConnectBtn = ({
    className,
    providerType,
    children,
    onErrorCB,
    ...rest
}) => {
    const celeste = useCeleste();

    // redux
    const { walletReducer } = useCelesteSelector(state => state);

    const onClick = async () => {
        try {
            await celeste.requestConnection(providerType);
        } catch (e) {
            onErrorCB(e);
        }
    };

    return (
        <button className={className} type="button" onClick={onClick} {...rest}>
            {walletReducer.isLoggedIn && walletReducer.address != null
                ? getAddressReduced(walletReducer.address)
                : children || 'Connect'}
        </button>
    );
};

ConnectBtn.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    onErrorCB: PropTypes.func.isRequired,
    providerType: PropTypes.oneOf(Object.values(providers)),
};

export default ConnectBtn;
