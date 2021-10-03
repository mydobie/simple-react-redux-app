import { combineReducers } from 'redux';

import { featureFlagsReducers } from 'feature-flags';
import dinos from './dinos';

export default combineReducers({ dinos, FeatureFlags: featureFlagsReducers });
