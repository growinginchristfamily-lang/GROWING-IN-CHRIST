/**
 * ============================================================
 *  GROWING IN CHRIST MINISTRY — Backend Server
 *  server.js  |  Node.js + Express
 * ============================================================
 *  Handles:
 *    • Static file serving (all HTML/CSS/JS pages)
 *    • Admin authentication (credentials stored in admin-config.json)
 *    • OTP generation and email delivery via Nodemailer (Gmail)
 *    • Password change / reset API
 * ============================================================
 *  ENV variables (.env):
 *    GMAIL_USER   = growinginchristfamily@gmail.com
 *    GMAIL_PASS   = <Gmail App Password — NOT your main password>
 *    SESSION_SECRET = <a random secret string>
 *    PORT         = 3000   (optional)
 * ============================================================
 *  Setup:
 *    npm install
 *    cp .env.example .env   (then fill in values)
 *    node server.js
 * ============================================================
 */

require('dotenv').config();
const express    = require('express');
const session    = require('express-session');
const nodemailer = require('nodemailer');
const fs         = require('fs');
const path       = require('path');
const crypto     = require('crypto');

const app  = express();
const PORT = process.env.PORT || 3000;

/* ── ADMIN CONFIG FILE ── */
const CONFIG_FILE = path.join(__dirname, 'admin-config.json');

function readConfig () {
  try {
    if (!fs.existsSync(CONFIG_FILE)) {
      const defaults = {
        username : 'GROWING IN CHRIST',
        password : 'gicm@2026',
        email    : 'growinginchristfamily@gmail.com',
        pendingOTP    : null,
        otpExpiry     : null,
      };
      fs.writeFileSync(CONFIG_FILE, JSON.stringify(defaults, null, 2));
      return defaults;
    }
    return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
  } catch (e) {
    console.error('[Config] Read error:', e.message);
    return {};
  }
}

function writeConfig (data) {
  try {
    const current = readConfig();
    const next = { ...current, ...data };
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(next, null, 2));
    return next;
  } catch (e) {
    console.error('[Config] Write error:', e.message);
    return null;
  }
}

/* ── NODEMAILER TRANSPORT ── */
const transporter = nodemailer.createTransport({
  service : 'gmail',
  auth    : {
    user : process.env.GMAIL_USER || 'growinginchristfamily@gmail.com',
    pass : process.env.GMAIL_PASS || '',          // Gmail App Password
  },
});

async function sendOTPEmail (toEmail, otp) {
  const html = `
    <!DOCTYPE html>
    <html>
    <body style="margin:0;padding:0;background:#f0faf4;font-family:'DM Sans',Arial,sans-serif">
      <div style="max-width:480px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(15,44,25,0.12)">
        <div style="background:linear-gradient(135deg,#082A17,#1B6B3A);padding:32px 36px;text-align:center">
          <h1 style="color:#fff;margin:0;font-size:1.3rem;font-weight:700;letter-spacing:0.04em">Growing in Christ Ministry</h1>
          <p  style="color:rgba(255,255,255,0.7);margin:6px 0 0;font-size:0.82rem;letter-spacing:0.08em;text-transform:uppercase">Admin Portal — Password Reset</p>
        </div>
        <div style="padding:36px">
          <h2 style="font-size:1.1rem;color:#0F2D1B;margin-bottom:8px">Your One-Time Password (OTP)</h2>
          <p style="color:#607868;font-size:0.9rem;line-height:1.6;margin-bottom:24px">
            A password reset was requested for the Growing in Christ Ministry admin panel.
            Use the code below to proceed. It expires in <strong>15 minutes</strong>.
          </p>
          <div style="background:#EAF6EF;border:2px dashed #1B6B3A;border-radius:12px;padding:24px;text-align:center;margin-bottom:24px">
            <div style="font-family:monospace;font-size:2.8rem;font-weight:900;letter-spacing:0.3em;color:#1B6B3A;line-height:1">${otp}</div>
            <div style="font-size:0.72rem;color:#607868;margin-top:8px;letter-spacing:0.06em;text-transform:uppercase">6-digit verification code</div>
          </div>
          <p style="font-size:0.82rem;color:#607868;line-height:1.6">
            If you did not request a password reset, please ignore this email or contact your system administrator immediately.
          </p>
          <div style="border-top:1px solid #e0ece4;margin-top:28px;padding-top:20px;text-align:center">
            <p style="font-size:0.75rem;color:#90a899;margin:0">© 2025 Growing in Christ Ministry · Nairobi, Kenya</p>
          </div>
        </div>
      </div>
    </body>
    </html>`;

  return transporter.sendMail({
    from    : `"Growing in Christ Ministry" <${process.env.GMAIL_USER || 'growinginchristfamily@gmail.com'}>`,
    to      : toEmail,
    subject : '🔐 Admin Password Reset OTP — Growing in Christ Ministry',
    html,
    text    : `Your password reset OTP is: ${otp}\n\nThis code expires in 15 minutes.\n\nGrowing in Christ Ministry Admin Portal`,
  });
}

/* ── MIDDLEWARE ── */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret            : process.env.SESSION_SECRET || 'gic-ministry-secret-2026',
  resave            : false,
  saveUninitialized : false,
  cookie            : { secure: false, maxAge: 8 * 60 * 60 * 1000 },  // 8h session
}));

/* ── PROTECT SENSITIVE FILES — must come BEFORE static middleware ── */
app.get('/admin-config.json', (req, res) => res.status(403).json({ error: 'Forbidden' }));
app.get('/.env',              (req, res) => res.status(403).json({ error: 'Forbidden' }));

/* Serve static files (HTML, CSS, JS) */
app.use(express.static(path.join(__dirname)));

/* ── AUTH MIDDLEWARE ── */
function requireAuth (req, res, next) {
  if (req.session && req.session.loggedIn) return next();
  res.status(401).json({ success: false, error: 'Unauthorised' });
}

/* ══════════════════════════════════════════
   API ROUTES
══════════════════════════════════════════ */

/* GET /api/check-auth — check if session is active */
app.get('/api/check-auth', (req, res) => {
  const cfg = readConfig();
  res.json({
    loggedIn : !!(req.session && req.session.loggedIn),
    username : req.session.username || null,
    email    : cfg.email || '',
  });
});

/* POST /api/login — authenticate admin */
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const cfg = readConfig();

  if (!username || !password) {
    return res.json({ success: false, error: 'Username and password are required.' });
  }

  const uMatch = username.trim().toLowerCase() === (cfg.username || '').toLowerCase();
  const pMatch = password === cfg.password;

  if (!uMatch) return res.json({ success: false, error: 'Username not recognised.' });
  if (!pMatch) return res.json({ success: false, error: 'Incorrect password.' });

  req.session.loggedIn = true;
  req.session.username = cfg.username;
  res.json({ success: true, username: cfg.username, email: cfg.email });
});

/* POST /api/logout */
app.post('/api/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ success: true });
  });
});

/* POST /api/send-otp — generate and email OTP */
app.post('/api/send-otp', async (req, res) => {
  const { email } = req.body;
  const cfg = readConfig();

  if (!email || email.trim().toLowerCase() !== (cfg.email || '').toLowerCase()) {
    return res.json({ success: false, error: 'That email is not registered.' });
  }

  const otp     = Math.floor(100000 + Math.random() * 900000).toString();
  const expiry  = Date.now() + 15 * 60 * 1000;

  writeConfig({ pendingOTP: otp, otpExpiry: expiry });

  try {
    await sendOTPEmail(cfg.email, otp);
    console.log(`[OTP] Sent to ${cfg.email}`);
    res.json({ success: true, message: `Verification code sent to ${cfg.email}` });
  } catch (err) {
    console.error('[OTP] Email error:', err.message);
    // Fallback: include OTP in response for dev/testing (remove in production)
    res.json({
      success        : true,
      message        : 'Code generated. (Email delivery failed — check server logs.)',
      devOTP         : process.env.NODE_ENV !== 'production' ? otp : undefined,
    });
  }
});

/* POST /api/verify-otp — verify OTP, set new password */
app.post('/api/verify-otp', (req, res) => {
  const { otp, newPassword } = req.body;
  const cfg = readConfig();

  if (!otp || otp !== cfg.pendingOTP) {
    return res.json({ success: false, error: 'Incorrect verification code.' });
  }
  if (Date.now() > cfg.otpExpiry) {
    return res.json({ success: false, error: 'Code has expired. Request a new one.' });
  }
  if (!newPassword || newPassword.length < 6) {
    return res.json({ success: false, error: 'New password must be at least 6 characters.' });
  }

  writeConfig({ password: newPassword, pendingOTP: null, otpExpiry: null });
  res.json({ success: true, message: 'Password updated successfully.' });
});

/* POST /api/change-password — change password when logged in */
app.post('/api/change-password', requireAuth, (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const cfg = readConfig();

  if (currentPassword !== cfg.password) {
    return res.json({ success: false, error: 'Current password is incorrect.' });
  }
  if (!newPassword || newPassword.length < 6) {
    return res.json({ success: false, error: 'New password must be at least 6 characters.' });
  }

  writeConfig({ password: newPassword });
  res.json({ success: true, message: 'Password changed successfully.' });
});

/* POST /api/update-account — update username and recovery email */
app.post('/api/update-account', requireAuth, (req, res) => {
  const { username, email } = req.body;
  if (!username) return res.json({ success: false, error: 'Username cannot be empty.' });
  if (!email)    return res.json({ success: false, error: 'Email cannot be empty.' });

  writeConfig({ username: username.trim(), email: email.trim().toLowerCase() });
  req.session.username = username.trim();
  res.json({ success: true, message: 'Account info updated.' });
});

/* GET /api/config — get non-sensitive config for frontend */
app.get('/api/config', requireAuth, (req, res) => {
  const cfg = readConfig();
  res.json({
    username : cfg.username,
    email    : cfg.email,
  });
});

/* ── START SERVER ── */
readConfig();   // Ensure config file exists with defaults
app.listen(PORT, () => {
  console.log(`\n  ╔════════════════════════════════════════════╗`);
  console.log(`  ║   Growing in Christ Ministry — Server     ║`);
  console.log(`  ║   http://localhost:${PORT}                    ║`);
  console.log(`  ╚════════════════════════════════════════════╝\n`);
  console.log(`  Admin:     http://localhost:${PORT}/admin.html\n`);
});
