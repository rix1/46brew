const pkg = require('./package.json');

module.exports = {
  env: {
    NAME: pkg.name,
    ENV: process.env.NODE_ENV,
    VERSION: pkg.version,
    VERCEL_GITHUB_COMMIT_SHA: process.env.VERCEL_GITHUB_COMMIT_SHA,
  },
};
