/* eslint-disable no-console */

const { createServer } = require('http');
const { parse } = require('url');
const { createReadStream } = require('fs');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const isDevelopment = process.env.NODE_ENV !== 'production';

const app = next({ isDevelopment });
const requestHandler = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;
    console.log(pathname);
    if (pathname === '/sw.js') {
      res.setHeader('content-type', 'text/javascript');
      createReadStream('./lib/sw-install.js').pipe(res);
    } else {
      requestHandler(req, res, parsedUrl);
    }
  }).listen(port, err => {
    if (err) throw err;
    console.log(`> Server running on http://localhost:${port}`);
  });
});
