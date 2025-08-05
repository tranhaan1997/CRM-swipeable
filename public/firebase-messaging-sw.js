/* eslint-disable no-undef */
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.11/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.11/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyAW3t_MK-bIxtkuogWWxe5Irj-9mPIIP_E",
  authDomain: "act-ai-app.firebaseapp.com",
  projectId: "act-ai-app",
  storageBucket: "act-ai-app.firebasestorage.app",
  messagingSenderId: "28557304093",
  appId: "1:28557304093:web:832e676c96dce798e801f4",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("[firebase-messaging-sw.js] Có thông báo mới:", payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/pwa-192x192.png",
  });
});
