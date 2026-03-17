const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const dataFile = path.join(__dirname, 'data', 'resources.json');
const publicDir = path.join(__dirname, 'public');

const read = () => JSON.parse(fs.readFileSync(dataFile, 'utf8'));
const write = (d) => fs.writeFileSync(dataFile, JSON.stringify(d, null, 2));

http.createServer((req, res) => {
  const u = new URL(req.url, 'http://localhost');

  if (u.pathname.startsWith('/api/resources')) {
    if (req.method === 'GET') {
      const q = (u.searchParams.get('q') || '').toLowerCase();
      const data = read().filter(x => x.name.toLowerCase().includes(q));
      return send(res, 200, data);
    }

    if (req.method === 'PUT') {
      let body = '';
      req.on('data', c => body += c);
      req.on('end', () => {
        const item = JSON.parse(body || '{}');
        if (!item.id || !item.name) return send(res, 400, { message: 'id and name required' });
        const data = read();
        const i = data.findIndex(x => x.id === Number(item.id));
        if (i >= 0) data[i] = item; else data.push(item);
        write(data);
        send(res, 200, { message: 'saved' });
      });
      return;
    }

    if (req.method === 'DELETE') {
      const id = Number(u.pathname.split('/').pop());
      write(read().filter(x => x.id !== id));
      return send(res, 200, { message: 'deleted' });
    }

    return send(res, 405, { message: 'method not allowed' });
  }

  const file = u.pathname === '/' ? 'index.html' : u.pathname.slice(1);
  const p = path.join(publicDir, file);
  if (!p.startsWith(publicDir) || !fs.existsSync(p)) return send(res, 404, 'not found', 'text/plain');
  const type = p.endsWith('.js') ? 'text/javascript' : 'text/html';
  send(res, 200, fs.readFileSync(p), type);
}).listen(3000, () => console.log('server ready at http://localhost:3000'));

function send(res, code, body, type = 'application/json') {
  res.writeHead(code, { 'Content-Type': type });
  res.end(type === 'application/json' ? JSON.stringify(body) : body);
}
