import React from 'react';
import { ui, uiConfig } from './firebaseUIComponent';

class Auth extends React.Component {
    componentDidMount() {
        ui.start('#firebaseui-auth-container', uiConfig);
    }

    render() {
        return (
            <div id="firebaseui-auth-container"></div>
        );
    }
}

export default Auth;
