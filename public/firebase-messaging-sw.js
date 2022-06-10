// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

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
// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  // eslint-disable-next-line no-restricted-globals
  self.registration.showNotification(notificationTitle,
    notificationOptions);
});