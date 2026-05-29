# Growing in Christ Ministry — Website
## Nairobi, Kenya

A church website with a real-time admin CMS backed by **Firebase Firestore** and a **Node.js/Express** server for static file serving.

---

## 🏗️ Architecture Overview

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | HTML5 + CSS3 + Vanilla JS (ES Modules) | Public website pages |
| Admin Portal | `admin.html` | CMS — edit all site content |
| Authentication | **Firebase Authentication** | Admin login & password reset |
| Database | **Firebase Firestore** | All site content (real-time sync) |
| Backend | **Node.js + Express** (`server.js`) | Static file serving |
| Email | Nodemailer + Gmail SMTP | Contact / notification emails |

> **Note:** The admin portal uses Firebase Authentication exclusively.
> The Node.js server does **not** handle admin login — it only serves files
> and provides utility API routes (email, config). Do not mix the two.

---

## 🚀 Quick Start

### 1. Install Node.js
Download from https://nodejs.org (v16 or later required)

### 2. Install dependencies
```bash
npm install
```

### 3. Set up Firebase
The admin portal requires a Firebase project. Follow these steps once:

1. Go to https://console.firebase.google.com
2. Create a new project (e.g. `gic-ministry`)
3. **Firestore Database** → Create → Production mode → choose region (e.g. `europe-west1`)
4. **Authentication** → Sign-in method → Enable **Email/Password**
5. **Authentication** → Users → Add user:
   - Email: `growinginchristfamily@gmail.com`
   - Password: choose a strong password (min 8 characters)
6. **Project Settings** → Your Apps → Add Web App → copy the config object
7. Paste your config values into `firebase-config.js` (replace all `TODO_*` placeholders)
8. Set **Firestore Security Rules** (paste the rules from the bottom of `firebase-config.js`)

### 4. Configure environment variables
```bash
cp .env.example .env
```
Edit `.env` — see the [Environment Variables](#-environment-variables) section below.

### 5. Start the server
```bash
npm start
# or for development with auto-reload:
npm run dev
```

Open http://localhost:3000

---

## 🔐 Admin Login

| Field    | Value |
|----------|-------|
| URL      | `http://localhost:3000/admin.html` |
| Email    | `growinginchristfamily@gmail.com` |
| Password | *(the password you set in Firebase Authentication step 5 above)* |

> **The admin password is set and managed entirely in Firebase.**
> It is not stored anywhere in this codebase. To change it, use the
> **Account & Password** panel inside the admin portal (when logged in),
> or use the **Forgot password?** link on the login page.

---

## 🔑 Changing the Admin Password

**When logged in:**
1. Open `admin.html` and log in
2. Click **Account & Password** in the left sidebar
3. Enter your current password and new password
4. Click **Update Password**

**When locked out (forgot password):**
1. Open `admin.html`
2. Click **Forgot password?**
3. Enter your admin email address
4. Firebase sends a secure reset link to your inbox
5. Click the link → set a new password → return to `admin.html` to log in

---

## 🌐 How Content Updates Work

1. Admin logs in → edits any section (events, homepage, leadership, etc.)
2. Clicks **Save Changes**
3. Data is written to **Firestore** (`siteData/main` document)
4. All public pages subscribe to Firestore in real time via `site-sync.js`
5. Every visitor's browser updates **instantly** — no rebuild or refresh needed

---

## 📂 File Structure

```
├── server.js             ← Node.js/Express — static file serving + utility APIs
├── package.json          ← npm dependencies
├── .env                  ← Environment variables (create from .env.example)
├── .env.example          ← Template — copy to .env and fill in values
│
├── firebase-config.js    ← Firebase project config + Firestore rules (EDIT THIS)
├── site-data.js          ← Firestore data layer + default content
├── site-sync.js          ← Real-time DOM sync (loaded on every public page)
├── layout.js             ← Shared nav + footer injection
├── styles.css            ← Global stylesheet
│
├── admin.html            ← Admin CMS portal (Firebase Auth protected)
├── index.html            ← Home page
├── about.html
├── ministries.html
├── departments.html
├── events.html
├── gallery.html
├── give.html
├── contact.html
├── membership.html
├── resources.html
├── beliefs.html
└── ellen-white.html
```

---

## ☁️ Deployment

### Option A — Render.com (recommended free option)

1. Push all files to a GitHub repository
2. Go to https://render.com → New → Web Service → connect your repo
3. **Build command:** `npm install`
4. **Start command:** `node server.js`
5. Add environment variables in the Render dashboard (see `.env.example`)
6. Deploy — Render provides a public HTTPS URL

### Option B — VPS / DigitalOcean / any Linux server

```bash
git clone <your-repo> /var/www/gic-ministry
cd /var/www/gic-ministry
npm install
cp .env.example .env   # then edit .env
node server.js         # or use pm2: pm2 start server.js --name gic
```

### Option C — Static hosting (Netlify / Vercel / GitHub Pages)

> The public website pages work on static hosting since all content
> comes from Firestore directly in the browser.
> The Node.js server is not required for the public site.
> **However**, the admin portal still requires Firebase to be configured.

1. Upload all HTML, CSS, JS files (everything except `server.js`, `package.json`, `.env`)
2. Make sure `firebase-config.js` has your real Firebase credentials

### Important: never commit secrets

Add these to your `.gitignore`:
```
.env
admin-config.json
```

---

## 🔧 Environment Variables

See `.env.example` for the full list. Key variables:

| Variable | Required | Description |
|----------|----------|-------------|
| `GMAIL_USER` | Yes (if using email features) | Gmail address for sending emails |
| `GMAIL_PASS` | Yes (if using email features) | Gmail **App Password** (not your main password) |
| `SESSION_SECRET` | Yes | Random secret string for Express sessions |
| `PORT` | No | Server port (default: `3000`) |
| `NODE_ENV` | No | Set to `production` on live server |

**Generating a Gmail App Password:**
1. Enable 2-Step Verification on your Google account
2. Go to https://myaccount.google.com/apppasswords
3. Select "Mail" → "Other" → name it "GIC Ministry" → Generate
4. Copy the 16-character password into `GMAIL_PASS` in your `.env`

---

## 🐞 Troubleshooting

| Issue | Fix |
|-------|-----|
| Can't log in to admin | Check that the Firebase user exists in Authentication → Users. The email and password must match exactly what was set in Firebase. |
| "Firebase: Error (auth/invalid-api-key)" | Your `firebase-config.js` still has `TODO_*` placeholder values. Replace them with your real Firebase project config. |
| Firestore permission denied | Check your Firestore Security Rules match the rules in `firebase-config.js` and that the logged-in user's email matches the rule condition. |
| Password reset email not arriving | Check your spam folder. The email comes from `noreply@[your-project].firebaseapp.com`. |
| Site content not updating on public pages | Make sure `site-sync.js` is loaded as `<script type="module" src="site-sync.js"></script>` — not as a plain script tag. |
| Gmail emails not sending | Use a Gmail **App Password**, not your main password. Make sure 2-Step Verification is enabled first. |
| Server won't start | Run `npm install` first. Check Node.js version is 16+: `node --version`. |
| Departments page shows blank | Confirm the `.departments-grid` div in `departments.html` has `id="gic-departments-grid"`. |

---

*© 2025 Growing in Christ Ministry · Nairobi, Kenya*
