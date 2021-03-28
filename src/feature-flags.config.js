/* eslint-disable import/prefer-default-export */

/* ****************** FEATURE FLAG CODES **************** */
/*
Add all feature flag ids as constants so it can be used across the application.
For example:

export const COLORS = 'COLORS';
*/
export const FRUITS = 'FRUITS';
export const VEGGIES = 'VEGGIES';
/* ****************** FEATURE FLAG  ARRAY ************** */
/*
Add all feature flags in the following format:
[
  {
    id: COLORS,  // id used across the app for this feature
    inuse: false, // should the feature be enabled?
    description: 'A list of all the primary and secondary colors.', // description shown for this feature
  },
  ...
]
*/
export const featureFlagArray = [
  {
    id: FRUITS,
    inuse: false,
    description: 'Fruit list',
  },
  {
    id: VEGGIES,
    inuse: true,
    description: 'Vegetable list',
  },
];
