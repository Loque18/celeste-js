/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { useCeleste } from '../celeste-provider';

const DisconnectBtn = ({ className, children, onErrorCB, ...rest }) => {
    const celeste = useCeleste();

    const onClick = async () => {
        try {
            await celeste.requestDisconnection();
        } catch (e) {
            onErrorCB(e);
        }
    };

    return (
        <div>
            <button
                className={className}
                onClick={onClick}
                type="button"
                {...rest}
            >
                {children || 'Disconnect wallet'}
            </button>
        </div>
    );
};

DisconnectBtn.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    onErrorCB: PropTypes.func.isRequired,
};

export default DisconnectBtn;
