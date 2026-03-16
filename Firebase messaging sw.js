importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyplaceholder",
  projectId: "act-portal-ad480",
  messagingSenderId: "placeholder",
  appId: "placeholder"
});

const messaging = firebase.messaging();

// Handle background messages — shows notification when app is closed
messaging.onBackgroundMessage(payload => {
  const { title, body, icon } = payload.notification || {};
  self.registration.showNotification(title || "ACT Portal", {
    body: body || "New notification from college",
    icon: icon || "/icon-192.png",
    badge: "/icon-192.png",
    vibrate: [200, 100, 200],
    data: payload.data,
    actions: [{ action: "open", title: "Open App" }]
  });
});

self.addEventListener("notificationclick", e => {
  e.notification.close();
  e.waitUntil(clients.openWindow("/"));
});
