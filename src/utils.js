// @flow
/* eslint no-useless-escape: "off" */

export default function isValidEmail(emailValue: string): boolean {
    const regexEmail = new RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    return emailValue.split(',').filter(email => !regexEmail.test(email)).length === 0;
}
