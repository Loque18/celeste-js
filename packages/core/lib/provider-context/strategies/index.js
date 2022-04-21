import { providers } from '../../contants';

import InjectedActionsStrategy from './injected';
import ConnectedActionsStrategy from './connected';
import ReadonlyStrategy from './readonly';

const StrategiesMap = {
    [providers.INJECTED]: InjectedActionsStrategy,
    [providers.CONNECTED]: ConnectedActionsStrategy,
    [providers.READONLY]: ReadonlyStrategy,
};

export default StrategiesMap;
