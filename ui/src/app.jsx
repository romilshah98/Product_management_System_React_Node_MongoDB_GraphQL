/* eslint linebreak-style: ["error","windows"] */
/* eslint "react/react-in-jsx-scope": "off" */
/* eslint "react/jsx-no-undef": "off" */
/* eslint "no-alert": "off" */

import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import Page from './page.jsx';

const element = (
  <Router>
    <Page />
  </Router>
);

const contentnode = document.getElementById('contents');

ReactDOM.render(element, contentnode);

if (module.hot) {
  module.hot.accept();
}
