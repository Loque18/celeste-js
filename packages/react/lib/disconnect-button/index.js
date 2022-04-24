/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { useCeleste } from '../celeste-provider';

const DisconnectBtn = ({ className, children, ...rest }) => {
    const celeste = useCeleste();

    const onClick = () => {
        celeste.requestDisconnect();
    };

    return (
        <div>
            <button className={className} onClick={onClick} {...rest}>
                {children || 'Disconnect wallet'}
            </button>
        </div>
    );
};

DisconnectBtn.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
};

export default DisconnectBtn;
