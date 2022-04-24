import React, { useContext } from 'react';
import PropTypes from 'prop-types';

const CelesteContext = React.createContext(null);

// Export your custom hooks if you wish to use them in other files.

export const useCeleste = () => {
    const celeste = useContext(CelesteContext);
    if (celeste === undefined) {
        throw new Error('useCeleste must be used within a CelesteProvider');
    }
    return celeste;
};

const CelesteProvider = ({ celeste, children }) => {
    return (
        <CelesteContext.Provider value={celeste}>
            {children}
        </CelesteContext.Provider>
    );
};

CelesteProvider.propTypes = {
    celeste: PropTypes.object.isRequired,
    children: PropTypes.node,
};

export default CelesteProvider;
