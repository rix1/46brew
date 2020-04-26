const withOffline = require('next-offline');
require('dotenv').config();
const pkg = require('./package.json');

const baseConfig = {
  env: {
    ANALYTICS_ENABLED: process.env.ANALYTICS_ENABLED === 'true',
    ANALYTICS_GA_ID: process.env.ANALYTICS_GA_ID,
    NAME: pkg.name,
    ENV: process.env.NODE_ENV,
    VERSION: pkg.version,
    VERCEL_GITHUB_COMMIT_SHA: process.env.VERCEL_GITHUB_COMMIT_SHA,
  },
};

const serviceWorkerConfig = {
  target: 'serverless',
  transformManifest: manifest => ['/'].concat(manifest), // add the homepage to the cache
  // Trying to set NODE_ENV=production when running yarn dev causes a build-time error so we
  // turn on the SW in dev mode so that we can actually test it
  generateInDevMode: true,
  workboxOpts: {
    modifyURLPrefix: {
      'static/': '_next/static/',
      'public/': '/',
    },
    swDest: 'static/service-worker.js',
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'https-calls',
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
};

module.exports =
  process.env.NODE_ENV === 'development'
    ? baseConfig
    : withOffline({ ...baseConfig, ...serviceWorkerConfig });
