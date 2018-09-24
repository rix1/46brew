// @flow
/* eslint-disable no-restricted-globals, no-console */

const CACHE_NAME = '46-sw-cache-v2';

const urlsToCache = [];

// self.addEventListener('install', installEvent => {
//   console.info('setting up cache...');
//   const preLoaded = caches
//     .open(CACHE_NAME)
//     .then(cache => cache.addAll(urlsToCache));
//   installEvent.waitUntil(preLoaded);
// });

self.addEventListener('fetch', fetchEvent => {
  console.info('[SW] intercepting fetch request');
  const response = caches
    .match(fetchEvent.request)
    .then(match => match || fetch(fetchEvent.request));

  fetchEvent.respondWith(response);
});
