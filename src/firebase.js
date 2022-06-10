import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqYwENWxgEw2FwoUy4wDiAadNLEJiZt1o",
  authDomain: "my-app-48628.firebaseapp.com",
  projectId: "my-app-48628",
  storageBucket: "my-app-48628.appspot.com",
  messagingSenderId: "813348264268",
  appId: "1:813348264268:web:f1425e8b5a166546fb17e9",
  measurementId: "G-QE57ELW81K"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const messaging = getMessaging();

export const requestForToken = () => {
  const PUBLIC_VAPID_KEY = "BIN7824_2O1hbM5PvuGEVJTf5Y09miXHEnvnQix1HDAND8dDkCoT3hGFPXkz6LkOFwHzaoFGrcVVQ_z2LMhqxps";
  return getToken(messaging, {vapidKey: PUBLIC_VAPID_KEY})
  .then((currentToken) => {
    if (currentToken) {
      console.log('current token for client: ', currentToken);
      // Perform any other neccessary action with the token
    } else {
      // Show permission request UI
      console.log('No registration token available. Request permission to generate one.');
    }
  })
  .catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
  });
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload", payload)
      resolve(payload);
    });
});