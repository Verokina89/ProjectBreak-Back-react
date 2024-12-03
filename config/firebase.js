require('dotenv').config();
const firebase = require('firebase/app');
const admin = require('firebase-admin');

//inicialza Firebas Admin SDK
const serviceAccount = {
    "type":process.env.FIREBASE_TYPE,
    "project_id":process.env.FIREBASE_PROJECT_ID,
    "private_key_id":process.env.FIREBASE_PRIVATE_KEY_ID,
    "private_key":process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), //Reemplaza saltos de línea
    "client_email":process.env.FIREBASE_CLIENT_EMAIL,
    "client_id":process.env.FIREBASE_CLIENT_ID,
    "auth_uri":process.env.FIREBASE_AUTH_URI,
    "token_uri":process.env.FIREBASE_TOKEN_URI,
    "auth_provider_x509_cert_url":process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
    "client_x509_cert_url":process.env.FIREBASE_CLIENT_PROVIDER_X509_CERT_URL,
    "universe_domain":process.env.FIREBASE_UNIVERSE_DOMAIN,
};

// Your web app's Firebase configuration
// Inicializar Firebase Admin SDK
if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
    });
};

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey:process.env.FIREBASE_API_PUBLIC_KEY,
    authDomain:process.env.FIREBASE_AUTH_DOMAIN,
    projectId:process.env.FIREBASE_PROJECT_ID,
    storageBucket:process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId:process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId:process.env.FIREBASE_APP_ID,
    measurementId:process.env.FIREBASE_MEASUREMENT_ID
};

const app = firebase.initializeApp(firebaseConfig)

module.exports = { app, serviceAccount, admin, firebaseConfig }