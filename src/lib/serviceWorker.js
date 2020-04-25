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
    navigator.serviceWorker.getRegistration('/').then(registration => {
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
        navigator.serviceWorker.getRegistration('/').then(registration => {
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
    return navigator.serviceWorker.getRegistration('/').then(registration => {
      registration.pushManager.getSubscription().then(subscription => {
        const isSubscribed = !(subscription === null);
        if (isSubscribed) {
          console.log('User is subscribed.', subscription);
        } else {
          console.log('User is NOT subscribed.', subscription);
        }
      });
    });
  }
  return Promise.reject();
}

function gr() {
  navigator.serviceWorker.getRegistrations().then(regs => {
    console.log(regs);
    regs[0].pushManager.getSubscription().then(subscription => {
      const isSubscribed = !(subscription === null);
      if (isSubscribed) {
        console.log('User is subscribed.', subscription);
      } else {
        console.log('User is NOT subscribed.', subscription);
      }
    });
  });
}
