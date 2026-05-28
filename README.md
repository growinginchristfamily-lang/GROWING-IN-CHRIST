# Growing in Christ Ministry — Website
## Nairobi, Kenya

---

## 🚀 Quick Start (with Backend Server)

### 1. Install Node.js
Download from https://nodejs.org (v16 or later)

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Email (for OTP password reset)
```bash
cp .env.example .env
```
Edit `.env` and fill in:
- `GMAIL_PASS` — Your Gmail **App Password** (NOT your main password)
  - Enable 2FA on Gmail first
  - Generate at: https://myaccount.google.com/apppasswords
  - Select "Mail" → "Other" → name it "GIC Ministry"
- `SESSION_SECRET` — Change to a long random string

### 4. Start the Server
```bash
npm start
```
Open http://localhost:3000

---

## 🔐 Admin Login
| Field    | Value                |
|----------|----------------------|
| Username | `GROWING IN CHRIST`  |
| Password | `gicm@2026`          |
| URL      | `/admin.html`        |

---

## 📂 File Structure
```
├── server.js           ← Node.js backend server
├── package.json        ← npm dependencies
├── admin-config.json   ← Admin credentials (auto-created)
├── .env                ← Email config (create from .env.example)
├── admin.html          ← Admin portal
├── index.html          ← Home page
├── about.html
├── ministries.html
├── events.html
├── gallery.html
├── give.html
├── contact.html
├── membership.html
├── resources.html
├── beliefs.html
├── ellen-white.html
├── styles.css
├── site-data.js        ← Shared localStorage data store
├── site-sync.js        ← Live site sync from admin changes
└── layout.js           ← Shared nav/footer injection
```

---

## ☁️ Deployment Options

### Option A: Static Hosting (Netlify / Vercel / GitHub Pages)
> Works without email OTP — password reset shows OTP in browser console
1. Upload all HTML, CSS, JS files
2. Admin credentials stored in browser localStorage
3. OTP for password reset will appear in browser console (F12)

### Option B: Full Server (VPS / Railway / Render)
1. Upload ALL files including `server.js`, `package.json`
2. Set environment variables (GMAIL_USER, GMAIL_PASS, SESSION_SECRET)
3. Run `npm start`
4. OTP emails are sent to `growinginchristfamily@gmail.com`

### Option C: Render.com (Free)
1. Create account at render.com
2. New Web Service → Connect GitHub repo
3. Build command: `npm install`
4. Start command: `node server.js`
5. Add environment variables in Render dashboard

---

## 🔑 Changing Admin Password
1. Go to `/admin.html`
2. Log in → **Account & Password** (left sidebar)
3. Enter current password and new password
4. Click **Change Password** — saved to server

## 📧 Resetting Forgotten Password
1. Go to `/admin.html`
2. Click **Forgot password?**
3. Enter: `growinginchristfamily@gmail.com`
4. 6-digit OTP is emailed to that address
5. Enter OTP → set new password

---

## 🐞 Troubleshooting
| Issue | Fix |
|-------|-----|
| Can't login | Username is case-insensitive. Password is exact. |
| OTP not received | Check `GMAIL_PASS` in `.env`. Use Gmail App Password. |
| Images not saving | Use files under 5MB. Images stored in browser localStorage. |
| Site not loading | Run `npm install` first, then `node server.js` |

---

*© 2025 Growing in Christ Ministry · Nairobi, Kenya*
