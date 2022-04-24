import React from 'react';

import PropTypes from 'prop-types';

import {
    Provider,
    createStoreHook,
    createDispatchHook,
    createSelectorHook,
} from 'react-redux';

import { store as celesteStore } from '@celeste-js/store';

const celesteStoreContext = React.createContext(null);

// Export your custom hooks if you wish to use them in other files.
export const useCelesteStore = createStoreHook(celesteStoreContext);
export const useCelesteDispatch = createDispatchHook(celesteStoreContext);
export const useCelesteSelector = createSelectorHook(celesteStoreContext);

const CelesteStoreProvider = ({ children }) => {
    return (
        <Provider context={celesteStoreContext} store={celesteStore}>
            {children}
        </Provider>
    );
};

CelesteStoreProvider.propTypes = {
    children: PropTypes.node,
};

export default CelesteStoreProvider;
