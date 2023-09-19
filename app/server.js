
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
import { isLoggedIn } from './firebase/Auth/firebaseAuth';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;

    if ((pathname === '/checkout' || pathname === '/successPage') && !isLoggedIn()) {
      // User is not authenticated, redirect to the login page
      res.writeHead(302, {
        Location: '/signIn', 
      });
      res.end();
      return;
    }

    handle(req, res, parsedUrl);
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
