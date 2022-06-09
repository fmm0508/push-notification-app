import { initializeApp } from "firebase/app";
import { getMessaging, onMessage, getToken } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJV4J1F68K20_Ulw3MkLr1VGMuilq9tik",
  authDomain: "esystemspush.firebaseapp.com",
  projectId: "esystemspush",
  storageBucket: "esystemspush.appspot.com",
  messagingSenderId: "319177733947",
  appId: "1:319177733947:web:a25577f3bc46529935291e"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const requestForToken = (setTokenFound) => {
  const PUBLIC_VAPID_KEY = "BNsdHucrl0rvLF-Fg_ZtTnBl6ufx8Y0wB8moMK9VkuyXHJVaFm6Z3Bhc9v8Au1iPdpfzf0FIZs0Z0JoOovPbNJY";
  return getToken(messaging, {vapidKey: PUBLIC_VAPID_KEY}).then((currentToken) => {
    if (currentToken) {
      console.log('current token for client: ', currentToken);
      setTokenFound(true);
      // Track the token -> client mapping, by sending to backend server
      // show on the UI that permission is secured
    } else {
      console.log('No registration token available. Request permission to generate one.');
      setTokenFound(false);
      // shows on the UI that permission is required 
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // catch error while creating client token
  });
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
});