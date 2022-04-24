// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import { useCelesteSelector } from '../celeste-store-provider';

const ConnectedWrapper = ({ children, disconnectedComponent }) => {
    const wallet = useCelesteSelector(state => state.walletReducer);

    return wallet.isLoggedIn ? children : disconnectedComponent || null;
};

ConnectedWrapper.propTypes = {
    children: PropTypes.node,
    disconnectedComponent: PropTypes.element,
};

export default ConnectedWrapper;
