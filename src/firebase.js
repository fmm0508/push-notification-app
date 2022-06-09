import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
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
initializeApp(firebaseConfig);
const messaging = getMessaging();

export const requestForToken = () => {
  const PUBLIC_VAPID_KEY = "BNsdHucrl0rvLF-Fg_ZtTnBl6ufx8Y0wB8moMK9VkuyXHJVaFm6Z3Bhc9v8Au1iPdpfzf0FIZs0Z0JoOovPbNJY";
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