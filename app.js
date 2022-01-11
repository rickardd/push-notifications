import "./sw.js";

const options = {
  body: "Here is a notification body!",
  icon: "duck.png",
  image: "duck.png",
  vibrate: [500, 50, 500],
  actions: [
    { action: "website", title: "Website" },
    { action: "myAccount", title: "My Account" },
  ],
};

Notification.requestPermission(function (status) {
  console.log("Notification permission status:", status);
});

function displayNotification() {
  if (Notification.permission === "granted") {
    navigator.serviceWorker.getRegistration().then(function (reg) {
      setInterval(() => {
        reg.showNotification("Survey reminder", options);
      }, 1000);
    });
  }
}

displayNotification();

function onWebsiteClick(event) {
  self.alert("Navigate to a website");
  console.log("website");
}

function onMyAccountClick(event) {
  self.alert("Navigate to my account");
}

function onBodyClick(event) {
  self.alert("You clicked on the body");
}

// self = window
self.addEventListener(
  "notificationclick",
  function (event) {
    event.notification.close();
    if (event.action === "website") {
      // User selected the website action.
      console.log("onWebsiteClick");
      onWebsiteClick(event);
    } else if (event.action === "myAccount") {
      // User selected the Learn More action.
      console.log("onMyAccountClick");
      onMyAccountClick(event);
    } else {
      // User selected (e.g., clicked in) the main body of notification.
      console.log("onBodyClick");
      alert(onBodyClick(event));
    }
  },
  false
);
