import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey:"AIzaSyBdMXRQlc5xIdxNxj1-EvTYASi7mIDcmXU",
    authDomain:"testfirebase-f660e.firebaseapp.com",
    projectId:"testfirebase-f660e",
    storageBucket:"testfirebase-f660e.appspot.com",
    messagingSenderId:"410638874211",
    appId:"1:410638874211:web:92adebcfce0b3fd904ea56",
};
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)