// @flow

import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Home from './Home';
import Result from './Result';

type EmailType = {
    value: string,
    validStatus: boolean,
    required: boolean
};

type ResultEmailType = {
    toEmail: EmailType,
    ccEmail: EmailType,
    bccEmail: EmailType,
    subject: string,
    message: string,
    imagePreviewUrl: any[]
};

type State = {
    email: ResultEmailType
}

class App extends Component<{}, State> {
    sendEmail = (email: ResultEmailType) => {
        this.setState({ email });
    };
    render() {
        return (
            <HashRouter>
                <div className="app">
                    <Route exact path="/" component={props => <Home {...props} sendEmail={this.sendEmail} />} />
                    <Route exact path="/result" component={() => <Result {...this.state} />} />
                </div>
            </HashRouter>
        );
    }
}

export default App;
