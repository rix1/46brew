// @flow
/* eslint-disable no-console */

export function setupServiceWorker() {
  if (navigator.serviceWorker) {
    navigator.serviceWorker
      .register('/sw.js')
      .then(() => {
        console.log('Service worker registered');
      })
      .catch(err => {
        console.error('Service worker registration failed!');
        console.error(err);
      });
  }
}
