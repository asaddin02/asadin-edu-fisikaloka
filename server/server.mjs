// Phsyco · Standalone High-Performance Node.js Dev & Production Server
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const PORT = parseInt(process.env.PORT || '8088', 10);
const HOST = process.env.HOST || '127.0.0.1';
const IS_LOG = process.env.LOG === '1' || process.env.NODE_ENV !== 'production';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8'
};

const server = http.createServer(async (req, res) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'");
  const reply = (status, message) => { res.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8' }); res.end(req.method === 'HEAD' ? undefined : message); };
  if (!['GET', 'HEAD'].includes(req.method)) {
    res.setHeader('Allow', 'GET, HEAD'); reply(405, 'Method Not Allowed'); return;
  }
  let reqPath;
  try { reqPath = decodeURIComponent(req.url.split('?')[0]); }
  catch { reply(400, 'Invalid URL encoding'); return; }
  if (reqPath.includes('\\') || reqPath.includes('\0') || reqPath.split('/').some(part => part.startsWith('.'))) {
    reply(403, 'Forbidden'); return;
  }
  // Application routes are extensionless paths ("/", "/entity/gravity"): serve the shell and let the router render.
  // Everything else must be a public asset; never expose the repo/server/tests.
  if (reqPath === '/' || !path.posix.basename(reqPath).includes('.')) reqPath = '/index.html';
  if (!['/index.html', '/manifest.webmanifest'].includes(reqPath) && !/^\/(js|css|assets)\//.test(reqPath)) {
    reply(404, 'Not Found'); return;
  }
  try {
    const filePath = await fs.promises.realpath(path.join(rootDir, reqPath));
    if (!filePath.startsWith(rootDir + path.sep)) { reply(403, 'Forbidden'); return; }
    const publicFile = path.relative(rootDir, filePath).replaceAll(path.sep, '/');
    if (!['index.html', 'manifest.webmanifest'].includes(publicFile) && !/^(js|css|assets)\//.test(publicFile)) { reply(403, 'Forbidden'); return; }
    const stats = await fs.promises.stat(filePath);
    if (!stats.isFile()) { reply(404, 'Not Found'); return; }
    const ext = path.extname(filePath).toLowerCase();
    if (!MIME_TYPES[ext]) { reply(404, 'Not Found'); return; }
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Content-Type', MIME_TYPES[ext]);
    res.setHeader('Content-Length', stats.size);
    if (req.method === 'HEAD') { res.end(); return; }
    const stream = fs.createReadStream(filePath);
    stream.on('error', () => { if (!res.headersSent) reply(500, 'Internal Server Error'); else res.destroy(); });
    stream.pipe(res);
  } catch (error) {
    reply(error.code === 'ENOENT' || error.code === 'ENOTDIR' ? 404 : 500, 'File unavailable');
  }
});

server.listen(PORT, HOST, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 Phsyco Server is running!`);
  console.log(`📡 URL: http://${HOST}:${PORT}`);
  console.log(`🌌 Interactive Physics Encyclopedia + Learning Platform`);
  console.log(`======================================================\n`);
});
