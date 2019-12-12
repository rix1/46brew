/* eslint-disable no-console */

export async function setupServiceWorker() {
  if (navigator.serviceWorker) {
    const existingSW = navigator.serviceWorker.controller;
    if (!existingSW || !['activated', 'installed'].includes(existingSW.state)) {
      navigator.serviceWorker
        .register('/sw.js')
        .then(e => {
          console.log(
            '%c[SW]',
            'color: #70BF47; font-weight: 700;',
            'ServiceWorker registered',
            e,
          );
        })
        .catch(err => {
          console.log(
            '%c[SW]',
            'color: #EE6559; font-weight: 700;',
            'ServiceWorker registration failed',
            err,
          );
        });
    } else {
      // console.info('Existing SW found. Not setting up...');
    }
  }
}
