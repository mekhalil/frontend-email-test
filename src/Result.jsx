// @flow

import React from 'react';
import {Link} from 'react-router-dom'

type EmailType = {
    value: string,
    validStatus: boolean,
    required: boolean
};

type Props = {
    email: {
        toEmail: EmailType,
        ccEmail: EmailType,
        bccEmail: EmailType,
        subject: string,
        message: string,
        imagePreviewUrl: any[]
    }
};

function Result(props: Props) {
    if (!Object.getOwnPropertyNames(props).length) {
        return (
            <div>
                <h1>Go to Home page First</h1>
                <Link to="/">back</Link>
            </div>
        )
    }
    const imagePreviewUrlList = Array.isArray(props.email.imagePreviewUrl) ? props.email.imagePreviewUrl : [];
    return (
        <div className="result">
            <header className="result-header">
                <i className="fas fa-check-circle" />
                <h5 className="result-header__title">Your email has been sent</h5>
            </header>
            <hr/>
            <div className="result-content">
                <h4 className="email-subject">{props.email.subject}</h4>
                <span className="email-reciever">to {props.email.toEmail ? props.email.toEmail.value : ''}</span>
                <p className="message">{props.email.message}</p>
            </div>
            <div className="footer">
                <div className="image-preview-list">
                    {imagePreviewUrlList.map(url => (
                        <div className="image-preview-wrapper" key={url.id}>
                            <img
                                className="preview-image"
                                src={url.value}
                                alt=""
                            />
                        </div>
                    ))}
                </div>
            </div>
            <Link to="/">back</Link>
        </div>
    )
}

export default Result;