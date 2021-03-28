import { combineReducers } from 'redux';

import { reducerFeatureFlags } from 'feature_flags';
import dinos from './dinos';

export default combineReducers({ reducerFeatureFlags, dinos });
