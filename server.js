// just for testing
import http from 'http';

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';

    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', () => {
      console.log('Received body:', body);
      res.end('OK');
    });
  } else {
    res.end('Send a POST request');
  }
});

server.listen(3000, () => {
  console.log('Listening on http://localhost:3000');
});