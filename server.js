// =========================================================
//  GROWING IN CHRIST MINISTRY — Local / Production Server
//  server.js
//  Run:  node server.js
//        npm start  (after npm install)
// =========================================================

const express = require('express');
const path    = require('path');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Cache headers ─────────────────────────────────────────
app.use((req, res, next) => {
  const url = req.url;
  if (url.endsWith('.css') || url.endsWith('.js')) {
    res.setHeader('Cache-Control', 'public, max-age=86400');   // 1 day
  } else if (/\.(jpg|jpeg|png|gif|webp|svg|ico)$/i.test(url)) {
    res.setHeader('Cache-Control', 'public, max-age=604800');  // 7 days
  } else {
    res.setHeader('Cache-Control', 'public, max-age=3600');    // 1 hour
  }
  next();
});

// ── Serve all static files from the project root ──────────
app.use(express.static(path.join(__dirname), {
  extensions: ['html'],   // lets /about resolve to /about.html
  index:      'index.html'
}));

// ── /index  →  /index.html  (mirrors render.yaml rewrite) ─
app.get('/index', (req, res) => {
  res.redirect(301, '/index.html');
});

// ── 404 — serve the custom error page ─────────────────────
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'));
});

// ── Start ─────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🌿 Growing in Christ Ministry`);
  console.log(`   Server running at http://localhost:${PORT}\n`);
});
