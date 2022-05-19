import { providers } from '../../constants';

import InjectedActionsStrategy from './injected';
import ConnectedActionsStrategy from './connected';

const StrategiesMap = {
    [providers.INJECTED]: InjectedActionsStrategy,
    [providers.CONNECTED]: ConnectedActionsStrategy,
};

export default StrategiesMap;
