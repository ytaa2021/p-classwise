import { EmailAuthProvider, getAuth } from 'firebase/auth';
import * as firebaseui from 'firebaseui';

const auth = getAuth();

const uiConfig = {
    signInOptions: [
        EmailAuthProvider.PROVIDER_ID,
    ],
};

const ui = new firebaseui.auth.AuthUI(auth);

export { ui, uiConfig };
