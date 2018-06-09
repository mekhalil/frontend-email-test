// @flow

import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';

test('render App without crashing', () => {
    shallow(<App />);
});
