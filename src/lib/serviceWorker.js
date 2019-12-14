function hasSupport() {
  if ('serviceWorker' in navigator) {
    return true;
  }
  console.log('ServiceWorker not supported');
  return false;
}

export function initServiceWorker() {
  if (hasSupport()) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js', { scope: '/' })
        .then(() => {
          console.log('SW registered ✅');
        })
        .catch(() => {
          console.error('SW registration failed ❌');
        });
    });
  }
}

export function requestPermission() {
  if (hasSupport()) {
    return Notification.requestPermission();
  }
  return Promise.reject();
}

export function vibrationExample() {
  if (hasSupport()) {
    navigator.serviceWorker.ready.then(function(registration) {
      const title = 'Vibrate Notification';
      const options = {
        // Star Wars shamelessly taken from the awesome Peter Beverloo
        // https://tests.peter.sh/notification-generator/
        vibrate: [
          500,
          110,
          500,
          110,
          450,
          110,
          200,
          110,
          170,
          40,
          450,
          110,
          200,
          110,
          170,
          40,
          500,
        ],
      };
      registration.showNotification(title, options);
    });
  }
}

export function testNotification() {
  if (hasSupport()) {
    Notification.requestPermission(function(result) {
      if (result === 'granted') {
        navigator.serviceWorker.ready.then(function(registration) {
          registration.showNotification('Vibration Sample', {
            body: 'Buzz! Buzz!',
            vibrate: [200, 100, 200, 100, 200, 100, 200],
            tag: 'vibration-sample',
          });
        });
      }
    });
  }
}

export function checkSubscription() {
  if (hasSupport()) {
    return navigator.serviceWorker.ready.then(registration => {
      return registration.pushManager.getSubscription().then(subscription => {
        const isSubscribed = !(subscription === null);
        if (isSubscribed) {
          console.log('User is subscribed.');
        } else {
          console.log('User is NOT subscribed.');
        }
      });
    });
  }
  return Promise.reject();
}
