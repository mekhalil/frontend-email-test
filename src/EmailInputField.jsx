// @flow

import React from 'react'

type Props = {
    id: string,
    name: string,
    placeholder: string,
    multiple: boolean,
    value: string,
    validationStatus: boolean,
    handleOnChange: Function
}

function EmailInputField(props: Props) {
    return <input
        id={props.id}
        name={props.name}
        className={`email-input-field ${props.validationStatus ? '' : 'invalid-input'}`}
        type="email"
        placeholder={props.placeholder}
        multiple={props.multiple? 'true' : 'false'}
        onChange={props.handleOnChange}
        value={props.value}
    />;
}

export default EmailInputField;