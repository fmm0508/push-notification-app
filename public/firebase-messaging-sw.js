importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyBJV4J1F68K20_Ulw3MkLr1VGMuilq9tik",
  authDomain: "esystemspush.firebaseapp.com",
  projectId: "esystemspush",
  storageBucket: "esystemspush.appspot.com",
  messagingSenderId: "319177733947",
  appId: "1:319177733947:web:a25577f3bc46529935291e"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});