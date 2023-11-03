import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const config = {
    apiKey: "AIzaSyCFhn_J6JIBg3BWG_qNW3rYPIvQUHykTBQ",
    authDomain: "p-classwise-6e67f.firebaseapp.com",
};

const app = initializeApp(config);
const auth = getAuth(app);

export { auth };
