/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable arrow-body-style */

/*
All feature flag options are run through this file in order to make 
disabling feature flags easier. 

If feature flags are not in use, you can delete the import
and uncomment generic returns in the functions below.
*/

// @ts-ignore
import {
  FlagType,
  useIsFeatureActive as useIsFeatureActiveNPM,
  loadFeatureFlagsRedux as loadFeatureFlagsReduxNPM,
  FeatureFlagsReduxUI as FeatureFlagsReduxUINPM,
  featureFlagsReducers as featureFlagsReducersNPM,
} from 'feature-flags';

import React from 'react';
/* ****************** FEATURE FLAG CODES **************** */

/*
Add all feature flag ids as constants so it can be used across the application.
*/

export const FEATURE_FLAGS = {
  COLORS: 'COLORS', // example feature flag
};

/* ****************** FEATURE FLAG  ARRAY ************** */
/*
Add all feature flags 
*/

export const featureFlagArray: [FlagType] | [] = [
  // Example feature flag
  {
    id: FEATURE_FLAGS.COLORS, // id used across the app for this feature
    active: false, // should the feature be enabled?
    description: 'A list of all the primary and secondary colors.', // description shown for this feature
  },
];

/* ****************** FEATURE FLAG  FUNCTIONS ************** */

export const useIsFeatureActive = (id: string) => {
  // return true; // Uncomment this line if feature flags are not in use.
  return useIsFeatureActiveNPM(id);
};

export const loadFeatureFlagsRedux = () => {
  // return null; // Uncomment this line if feature flags are not in use.
  return loadFeatureFlagsReduxNPM({
    features: featureFlagArray,
    overrides: JSON.parse(process.env.REACT_APP_FEATURE_FLAGS ?? '[]'),
    persist:
      process.env.REACT_APP_USE_LOCAL_STORAGE === 'true' &&
      process.env.REACT_APP_FEATURE_FLAGS_PERSIST === 'true',
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FeatureFlagsReduxUI = (props: any) => {
  // return <>Feature Flags are not enabled in this application.</>; // Uncomment this line if feature flags are not in use.

  return <FeatureFlagsReduxUINPM {...props} />;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const featureFlagsReducers = (state: any) => state; // Uncomment this line if feature flags are not in use.
export const featureFlagsReducers = featureFlagsReducersNPM;
