// @flow

type NotificationType = {
  title: string,
  icon: string,
  body: string,
};

// function requestNotificationPermission() {
//   if (Notification && Notification.permission === 'default') {
//     Notification.requestPermission(permission => {
//       if (!('permission' in Notification)) {
//         Notification.permission = permission;
//       }
//     });
//   }
// }

function sendNotification({ title, ...rest }: NotificationType) {
  self.registration.showNotification(title, {
    tag: '46brew',
    vibrate: [200, 100, 200],
    ...rest,
  });
}

export function notifiy() {
  Notification.requestPermission(result => {
    if (result === 'granted') {
      navigator.serviceWorker.ready.then(registration => {
        registration.showNotification('Vibration Sample', {
          body: 'Buzz! Buzz!',
          icon: '../images/touch/chrome-touch-icon-192x192.png',
          vibrate: [200, 100, 200, 100, 200, 100, 200],
          tag: 'vibration-sample',
        });
      });
    }
  });
}

// sendNotification({
//   title: 'first',
//   icon: 'https://www.placecage.com/gif/200/300',
//   body: 'Want coffee?',
// });
