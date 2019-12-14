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
    Notification.requestPermission(result => {
      console.log(
        'Notification permission:',
        result === 'granted' ? '✅' : '❌',
      );
    });
  }
}

export function testNotification() {
  if (hasSupport()) {
    if (Notification.permission === 'granted') {
      navigator.serviceWorker.getRegistration().then(reg => {
        reg.showNotification('Hello world!');
        console.log('should show notification');
      });
    }
  }
}

export function checkSubscription() {
  if (hasSupport()) {
    navigator.serviceWorker.ready.then(registration => {
      if (registration) {
        registration.pushManager.getSubscription().then(subscription => {
          const isSubscribed = !(subscription === null);
          if (isSubscribed) {
            console.log('User is subscribed.');
          } else {
            console.log('User is NOT subscribed.');
          }
        });
      }
    });
  }
}
