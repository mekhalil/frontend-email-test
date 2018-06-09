// @flow
import React from 'react';
import ReactDOM from 'react-dom';

const rootElement = document.getElementById('root');

if (rootElement) {
    ReactDOM.render(<h1>Hello, world!</h1>, rootElement);
} else {
    throw new Error('Cannot find dom element with root id!');
}
