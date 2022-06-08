import React, {useEffect} from "react";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
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


function App() {
  let isPushEnabled = false;

  useEffect(function() {
    onClickHandle();
  });

  function subscribe() {
    var pushButton = document.querySelector(".js-push-button");
    pushButton.disabled = true;

    navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
      serviceWorkerRegistration.pushManager.subscribe()
        .then(function(subscription) {
          isPushEnabled = true;
          pushButton.textContent = "Disable Push Messages";
          pushButton.disabled = false;
          // TODO: Send the subscription.endpoint to your server
          // and save it to send a push message at a later date
          console.log(subscription);
          //return sendSubscriptionToServer(subscription);
        })
        .catch(function(e) {
          if(Notification.permission === "denied") {
            console.warn("Permission for Notifications was denied");
            pushButton.disabled = true;
          } else {
            console.error("Unable to subscribe to push.", e);
            pushButton.disabled = false;
            pushButton.textContent = "Enable Push Messages";
          }
        });
    });
  }

  function initialiseState() {
    if(!("showNotification" in ServiceWorkerRegistration.prototype)) {
      console.warn("Notifications aren't supported.");
      return;
    }

    if(Notification.permission === "denied") {
      console.warn("The user has blocked notifications.");
      return;
    }

    if(!("PushManager" in window)) {
      console.warn("Push messaging isn't supported");
      return;
    }

    navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
      serviceWorkerRegistration.pushManager.getSubscription()
        .then(function(subscription) {
          var pushButton = document.querySelector(".js-push-button");
          pushButton.disabled = false;

          if(!subscription) {
            return;
          }
          console.log(subscription);
          //sendSubscriptionToServer(subscription);

          pushButton.textContent = "Disable Push Messages";
          isPushEnabled = true;
        })
        .catch(function(err) {
          console.warn("Error during getSubscription()", err);
        });
    })
  }

  function onClickHandle() {

    if(isPushEnabled) {
      //unsubscribe
    } else {
      subscribe();
    }

    if("serviceWorker" in navigator) {
      navigator.serviceWorker.register('sw.js')
      .then(initialiseState);
    }else {
      console.warn("Service workers aren't supported in this browswer");
    }
  }

  return (
    <div>
      <button className="js-push-button" onClick={onClickHandle} disabled>Enable Push Messages</button>
    </div>
  );
}

export default App;
