const admin = require('firebase-admin');

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS_JSON);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

console.log('Firebase Admin initialized successfully.');

module.exports = admin;


// if (!admin.apps.length) { //asegura no inicalizar ms vcs
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: process.env.FIREBASE_DATABASE_URL,
//   });

//   console.log('Firebase Admin apps:', admin.apps);

// }
