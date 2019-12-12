/* eslint-disable no-restricted-globals, no-console */

const cachedCSS = ['https://unpkg.com/tachyons@4.11.1/css/tachyons.min.css'];

const CACHE_NAME = '46-sw-cache-v0';
const urlsToCache = ['/', '/about', ...cachedCSS];

(function() {
  self.addEventListener('install', installEvent => {
    console.log(
      '%c[SW]',
      'color: #E0C04C; font-weight: 700;',
      'Installing serviceworker',
    );
    const preLoaded = caches.open(CACHE_NAME).then(cache => {
      // Cache open
      cache.addAll(urlsToCache);
    });
    installEvent.waitUntil(preLoaded);
  });

  self.addEventListener('activate', activateEvent => {
    console.log(
      '%c[SW]',
      'color: #70BF47; font-weight: 700;',
      'ServiceWorker activated',
      activateEvent,
    );
  });

  self.addEventListener('fetch', fetchEvent => {
    const response = caches.open(CACHE_NAME).then(cache => {
      cache.match(fetchEvent.request).then(cachedResponse => {
        if (cachedResponse) {
          if (navigator.onLine) {
            // Fetch a new version and update the cache
            fetch(fetchEvent.request).then(networkResponse => {
              cache.put(fetchEvent.request, networkResponse.clone());
            });
          } else {
            console.log(
              '%c[SW]:',
              'color: #9E9E9E; font-weight: 700;',
              'Navigator offline. Useing cached response',
              fetchEvent,
            );
          }
          // In the mean time, return the cached version
          return cachedResponse;
        }
        // No match was found in the cache. Initiate new request
        return fetch(fetchEvent.request);
      });
    });

    fetchEvent.respondWith(response);
  });
})();
