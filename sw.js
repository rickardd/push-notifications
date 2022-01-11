if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./sw.js")
    .then((registration) => {
      // registration worked
      console.log("Registration succeeded. Scope is " + registration.scope);

      if (registration.installing) {
        console.log("Service worker installing");
      } else if (registration.waiting) {
        console.log("Service worker installed");
      } else if (registration.active) {
        console.log("Service worker active");
      }
    })
    .catch((error) => {
      // registration failed
      console.log("Registration failed with " + error);
    });
}
