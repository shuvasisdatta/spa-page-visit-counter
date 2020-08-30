import firebase from "firebase/app"
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_CONFIG_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_CONFIG_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_CONFIG_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_CONFIG_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_CONFIG_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_CONFIG_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_CONFIG_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_CONFIG_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()

export default db