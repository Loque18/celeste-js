/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { useCeleste } from '../celeste-provider';

const SwithNetworkButton = ({
    children,
    chainId,
    className,
    onErrorCB,
    ...rest
}) => {
    const celeste = useCeleste();

    const onClick = async () => {
        try {
            await celeste.requestChangeNetwork(+chainId);
        } catch (e) {
            onErrorCB(e);
        }
    };

    return (
        <button className={className} onClick={onClick} type="button" {...rest}>
            {children}
        </button>
    );
};

SwithNetworkButton.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    chainId: PropTypes.number.isRequired,
    onErrorCB: PropTypes.func,
};

export default SwithNetworkButton;
