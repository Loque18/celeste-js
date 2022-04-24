import React from 'react';
import PropTypes from 'prop-types';

const CelesteContext = React.createContext(null);

// Export your custom hooks if you wish to use them in other files.

export const useCeleste = () => {
    const context = React.useContext(CelesteContext);
    if (context === undefined) {
        throw new Error('useCeleste must be used within a CelesteProvider');
    }
    return context.value;
};

const CelesteProvider = ({ celeste, children }) => {
    return <CelesteContext value={celeste}>{children}</CelesteContext>;
};

CelesteProvider.propTypes = {
    celeste: PropTypes.object.isRequired,
    children: PropTypes.node,
};

export default CelesteProvider;
