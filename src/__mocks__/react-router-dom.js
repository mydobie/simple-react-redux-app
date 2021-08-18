/* eslint-disable react/jsx-filename-extension */

import React from 'react';

const rrd = require('react-router-dom');
// Just render plain div with its children
rrd.BrowserRouter = ({ children }) => <div>{children}</div>;
rrd.HashRouter = ({ children }) => <div>{children}</div>;

// HashRouter
module.exports = rrd;
