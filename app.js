import "./sw.js";

const inputs = {
  title: document.querySelector('[name="title"]'),
  body: document.querySelector('[name="body"]'),
  interval: document.querySelector('[name="interval"]'),
  start: document.querySelector("button"),
};

let title = "Default title";
let interval = 5000;
let options = {
  body: "Here is a notification body!",
  icon: "duck.png",
  image: "duck.png",
  vibrate: [500, 50, 500],
  actions: [
    { action: "website", title: "Website" },
    { action: "myAccount", title: "My Account" },
  ],
};

// Ask user for Push Notification permissions.
Notification.requestPermission(function (status) {
  console.log("Notification permission status: ---", status);
});

function displayNotification() {
  if (Notification.permission === "granted") {
    navigator.serviceWorker.getRegistration().then(function (reg) {
      setInterval(() => {
        reg.showNotification(title + Math.random(), options);
      }, interval);
    });
  }
}

function onWebsiteClick(event) {
  self.alert("Navigate to a website");
  console.log("website");
  self.location.href =
    "https://www.google.com/search?q=you+clicked+on+the+website+option&rlz=1C5CHFA_enNZ924NZ924&oq=you+clicked+on+the+website+option&aqs=chrome..69i57j69i64.9183j0j15&sourceid=chrome&ie=UTF-8";
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

function bind() {
  inputs.start.addEventListener("click", (e) => {
    e.preventDefault();
    title = inputs.title.value;
    options.body = inputs.body.value;
    interval = parseInt(inputs.interval.value, 10) * 1000; // Converts sec to milliseconds
    inputs.start.innerText = "WAIT";
    displayNotification();
  });
}

bind();
