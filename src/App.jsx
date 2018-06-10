// @flow

import React, { Component } from 'react';
import EmailInputField from './EmailInputField';
import isValidEmail from './utils';

type EmailType = {
    value: string,
    validStatus: boolean,
    required: boolean
};
type State = {
    toEmail: EmailType,
    ccEmail: EmailType,
    bccEmail: EmailType,
    subject: string,
    message: string,
    imagePreviewUrl: any[]
};

type Props = {};

class App extends Component<Props, State> {
    state = {
        toEmail: {
            value: '',
            validStatus: true,
            required: true
        },
        ccEmail: {
            value: '',
            validStatus: true,
            required: false
        },
        bccEmail: {
            value: '',
            validStatus: true,
            required: false
        },
        subject: '',
        message: '',
        imagePreviewUrl: []
    };

    getTheImgData(file: File) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const imagePreviewUrl = [
                ...this.state.imagePreviewUrl,
                { value: reader.result, id: file.name.replace(/\s/g, '') }
            ];
            this.setState({
                imagePreviewUrl
            });
        };

        reader.readAsDataURL(file);
    }

    handleInputChange = (
        event: SyntheticKeyboardEvent<HTMLFormElement> & { target: HTMLInputElement }
    ) => {
        event.preventDefault();
        if (event.target.type === 'email') {
            const emailData = {};
            emailData.value = event.target.value;
            if (!this.state[event.target.name].required && !emailData.value) {
                emailData.validStatus = true;
            } else {
                emailData.validStatus = isValidEmail(emailData.value);
            }
            this.setState({ [event.target.name]: emailData });
        } else {
            this.setState({ [event.target.name]: event.target.value });
        }
    };

    sendEmail = (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        // const { toEmail, ccEmail, bccEmail, subject, message } = this.state;
        // console.log('To: ', toEmail.value);
        // console.log('ccEmail: ', ccEmail.value);
        // console.log('bccEmail: ', bccEmail.value);
        // console.log('subject: ', subject);
        // console.log('message: ', message);
    };

    checkIfCanSubmit = () => {
        const { toEmail, ccEmail, bccEmail, subject } = this.state;
        return !!(
            subject &&
            toEmail.value &&
            (toEmail.validStatus && ccEmail.validStatus && bccEmail.validStatus)
        );
    };

    uploadMultiFiles = (event: SyntheticEvent<EventTarget>) => {
        event.preventDefault();
        const fileUploadElem = document.getElementById('fileid');
        if (fileUploadElem) {
            fileUploadElem.click();
        }
    };

    handleUploadedFiles = (event: SyntheticEvent<EventTarget>) => {
        event.preventDefault();
        const fileUploadElem: HTMLInputElement = document.getElementById('fileid');
        const fileList: FileList = fileUploadElem.files;

        for (let i = 0; i < fileList.length; i += 1) {
            this.getTheImgData(fileList[i]);
        }
    };

    removeImage = (event: SyntheticEvent<EventTarget>) => {
        event.preventDefault();
        const imagePreviewUrl = this.state.imagePreviewUrl.filter(file => file.id !== event.target.id);
        this.setState({imagePreviewUrl})
    };

    render() {
        const toEmail = {
            id: 'emailToInput',
            name: 'toEmail',
            placeholder: 'To',
            multiple: true,
            value: this.state.toEmail.value,
            validationStatus: this.state.toEmail.validStatus,
            handleOnChange: this.handleInputChange
        };
        const ccEmail = {
            id: 'emailCcInput',
            name: 'ccEmail',
            placeholder: 'CC',
            multiple: true,
            value: this.state.ccEmail.value,
            validationStatus: this.state.ccEmail.validStatus,
            handleOnChange: this.handleInputChange
        };
        const bccEmail = {
            id: 'emailBccInput',
            name: 'bccEmail',
            placeholder: 'BCC',
            multiple: true,
            value: this.state.bccEmail.value,
            validationStatus: this.state.bccEmail.validStatus,
            handleOnChange: this.handleInputChange
        };
        const canSubmit = this.checkIfCanSubmit();
        return (
            <div className="container">
                <header className="header">
                    <h5 className="header__title">Send E-mail</h5>
                </header>
                <div className="content">
                    <form id="form" onSubmit={this.sendEmail}>
                        <EmailInputField {...toEmail} />
                        <EmailInputField {...ccEmail} />
                        <EmailInputField {...bccEmail} />
                        <input
                            type="text"
                            id="subject"
                            className="text-input-field"
                            name="subject"
                            value={this.state.subject}
                            placeholder="Subject"
                            onChange={this.handleInputChange}
                        />
                        <textarea
                            id="message"
                            className="text-input-field"
                            name="message"
                            value={this.state.message}
                            placeholder="Message"
                            onChange={this.handleInputChange}
                        />
                        <input
                            id="fileid"
                            type="file"
                            onChange={this.handleUploadedFiles}
                            multiple
                            hidden
                        />
                    </form>
                    {this.state.imagePreviewUrl.length > 0 ? <h4>Attached files</h4> : ''}
                    <div className="image-preview-list">
                        {this.state.imagePreviewUrl.map(url => (
                            <div className="image-preview-wrapper">
                                <button className="delete-btn" id={url.id} onClick={this.removeImage}>
                                    delete
                                </button>
                                <img
                                    className="preview-image"
                                    key={url.id}
                                    src={url.value}
                                    alt=""
                                />
                            </div>
                        ))}
                    </div>
                    <div className="form-footer">
                        <button className="upload-file-btn" onClick={this.uploadMultiFiles}>
                            upload
                        </button>
                        <button
                            className="submit-btn"
                            type="submit"
                            form="form1"
                            value="Submit"
                            disabled={!canSubmit}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
