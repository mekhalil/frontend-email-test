// @flow

import React from 'react';
import { shallow } from 'enzyme';
import EmailInputField from '../EmailInputField';
import isValidEmail from '../utils';

const props = {
    id: 'testInput',
    name: 'toEmail',
    placeholder: 'To',
    multiple: true,
    value: '',
    validationStatus: true,
    handleOnChange: evt => {
        props.value = evt.target.value;
        props.validationStatus = isValidEmail(props.value);
    }
};

test('Render Component without crashing', () => {
    shallow(<EmailInputField {...props} />);
});

test('The component should contain an input field', () => {
    const component = shallow(<EmailInputField {...props} />);
    expect(component.find('input.email-input-field').length).toEqual(1);
});

test('The component should contain an Email input field', () => {
    const component = shallow(<EmailInputField {...props} />);
    expect(component.find('input').prop('type')).toEqual('email');
});

test('The provided placeholder should be added', () => {
    const component = shallow(<EmailInputField {...props} />);
    expect(component.find('input').prop('placeholder')).toEqual(props.placeholder);
});

test('The component should allow multiple email', () => {
    const component = shallow(<EmailInputField {...props} />);
    expect(component.find('input').prop('multiple')).toEqual('true');
});

test('The component should call onChange handler', () => {
    const customProps = {
        id: 'testInput',
        name: 'toEmail',
        placeholder: 'To',
        multiple: true,
        value: '',
        validationStatus: true,
        handleOnChange: jest.fn()
    };
    const event = {
        target: { value: 'value@email.com' }
    };
    const component = shallow(<EmailInputField {...customProps} />);
    component.find('input').simulate('change', event);
    expect(customProps.handleOnChange).toBeCalledWith(event);
});

test('The component should add the value from props', () => {
    const email = 'value@email.com';
    const component = shallow(<EmailInputField {...props} />);
    component.find('input').simulate('change', { target: { value: email } });
    component.setProps({value: props.value});
    expect(component.find('input').prop('value')).toEqual(email);
});

test('The component should not have class name invalid-input if the email is valid', () => {
    const email = 'value@email.com';
    const component = shallow(<EmailInputField {...props} />);
    component.find('input').simulate('change', { target: { value: email } });
    component.setProps({...props});
    expect(component.find('input.invalid-input').length).toEqual(0);
});

test('The component should have class name invalid-input when the introduced email is not valid', () => {
    const email = 'valueemail';
    const component = shallow(<EmailInputField {...props} />);
    component.find('input').simulate('change', { target: { value: email } });
    component.setProps({...props});
    expect(component.find('input.invalid-input').length).toEqual(1);
});
