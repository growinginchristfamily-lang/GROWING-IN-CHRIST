# Growing in Christ Ministry — Website

A full church website for **Growing in Christ Ministry**, Nairobi, Kenya, built with vanilla HTML/CSS/JavaScript, Firebase Firestore for real-time content management, and a Node.js/Express server for static file serving and email utilities.

---

## Architecture Overview

| Layer | Technology | Purpose |
|-------|------------|---------|
| Frontend | HTML5, CSS3, Vanilla JS (ES Modules) | All public-facing pages |
| Admin Portal | `admin.html` | CMS — edit all site content |
| Authentication | Firebase Authentication | Admin login & password reset |
| Database | Firebase Firestore | Real-time site content storage |
| Backend | Node.js + Express (`server.js`) | Static file serving + email APIs |
| Email | Nodemailer + Gmail SMTP | OTP and notification emails |
| Messaging | WhatsApp deep links (`wa.me`) | Forms, registrations, giving |

> **Note:** The admin portal uses **Firebase Authentication** exclusively.
> The Node.js server does not handle admin login — it only serves static files
> and provides email/utility API routes.

---

## File Structure

```
├── index.html            ← Homepage
├── about.html            ← About the ministry
├── beliefs.html          ← 28 Fundamental Beliefs (SDA)
├── contact.html          ← Contact page with WhatsApp form
├── departments.html      ← Church departments
├── events.html           ← Upcoming events & regular services
├── gallery.html          ← Photo gallery (Firestore-powered)
├── give.html             ← Online giving (M-Pesa + WhatsApp)
├── membership.html       ← Membership application
├── ministries.html       ← Ministry pages (Worship, Youth, etc.)
├── resources.html        ← Bible study resources & quarterlies
├── admin.html            ← Admin CMS portal (Firebase Auth protected)
│
├── styles.css            ← Global stylesheet
├── layout.js             ← Shared nav, topbar & footer injection
├── site-data.js          ← Firestore data layer + default content (ES module)
├── site-sync.js          ← Real-time Firestore → DOM sync (ES module)
├── firebase-config.js    ← Firebase project config & exports (EDIT THIS)
│
├── server.js             ← Node.js/Express server
├── package.json          ← npm dependencies
├── .env                  ← Environment variables (never commit this file)
└── .env.example          ← Template — copy to .env and fill in values
```

---

## Quick Start

### 1. Install Node.js

Download from https://nodejs.org — version 16 or later is required.

### 2. Install Dependencies

```bash
npm install
```

### 3. Firebase Setup

The admin portal requires a Firebase project. Complete these steps once:

1. Go to https://console.firebase.google.com
2. Open the existing project **growing-in-christ-1e1b3** — or create a new one
3. **Firestore Database** → Create → Production mode → choose a region (e.g. `europe-west1`)
4. **Authentication** → Sign-in method → Enable **Email/Password**
5. **Authentication** → Users → Add user:
   - Email: `growinginchristfamily@gmail.com`
   - Password: choose a strong password (12+ characters recommended)
6. **Project Settings** → Your Apps → Add Web App → copy the config object
7. Paste your config values into `firebase-config.js`, replacing any placeholder values
8. Apply the **Firestore Security Rules** from the [section below](#firestore-security-rules)
9. Apply the **Firebase Storage Rules** from the [section below](#firebase-storage-rules)

### 4. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your values:

```env
GMAIL_USER=growinginchristfamily@gmail.com
GMAIL_PASS=your_16_char_gmail_app_password
SESSION_SECRET=your_random_secret_string
PORT=3000
NODE_ENV=production
```

> **GMAIL_PASS** must be a Gmail **App Password**, not your main password.
> See [Generating a Gmail App Password](#generating-a-gmail-app-password) below.

### 5. Start the Server

```bash
# Production
npm start

# Development (auto-restart on file changes)
npm run dev
```

The site will be available at **http://localhost:3000**.

---

## Admin Portal

**URL:** `http://localhost:3000/admin.html`

Log in with the email and password you set in Firebase Authentication (Step 3.5 above). There is no hardcoded default password — you create it when adding the Firebase user.

### What the Admin Portal Manages

| # | Section | Firestore Key | What You Can Edit |
|---|---------|---------------|-------------------|
| 1 | Global Settings | `siteSettings` | Church name, WhatsApp number, brand colours, maintenance mode |
| 2 | Homepage | `homepage` | Headline, subtext, hero image, stats, CTA buttons |
| 3 | About | `about` | Mission, vision, motto, history timeline |
| 4 | Leadership | `leadership` | Pastor names, roles, bios, photos |
| 5 | Departments | `departments` | Department cards (name, head, description, colour) |
| 6 | Ministries | `ministries` | Ministry sections (name, description, schedule, CTA) |
| 7 | Events | `events` | Event dates, titles, descriptions, registration type |
| 8 | Announcements | `announcements` | Homepage announcement banners |
| 9 | Gallery | `gallery` | Photo URLs, captions, categories |
| 10 | Give | `give` | M-Pesa Paybill number, account number, giving amounts |
| 11 | Contact | `contact` | Address, phone, email, service times |
| 12 | Account & Password | — | Change admin login password |

### Status Indicators

- **Green dot** — Section is live and synced to all visitors
- **Yellow dot** — You have unsaved changes in this section
- **"✓ Live · Last synced X:XX"** — Timestamp of the last successful save

### Changing the Admin Password

**When logged in:**
1. Open the admin portal and log in
2. Click **Account & Password** in the sidebar
3. Enter your current password and new password → click **Update Password**

**When locked out:**
1. Open `admin.html` and click **Forgot password?**
2. Enter your admin email address
3. Firebase sends a secure reset link to your inbox
4. Click the link, set a new password, then log back in

---

## How Real-Time Sync Works

```
Admin edits content in admin.html
           ↓
Clicks "Save & Sync"
           ↓
Data is written to Firestore (siteData/main)
           ↓
Firestore triggers onSnapshot() on all open public pages
           ↓
site-sync.js receives new data and updates the DOM
           ↓
Every visitor's screen updates within 1–2 seconds
           ↓
No page refresh or rebuild needed
```

---

## Image Uploads

The admin panel uses URL-based image management. To add images:

1. Go to Firebase Console → **Storage** → Upload your file
2. Click the uploaded file → **Get download URL** (copy the full URL)
3. Paste the URL into the relevant image field in the admin portal
4. Click **Save & Sync** — the image appears on the website instantly

**Recommended Storage folder structure:**

```
/gallery/          ← Photo gallery images
/hero/             ← Hero & banner backgrounds
/team/             ← Leadership team photos
/logo/             ← Church logos
/departments/      ← Department feature images
```

---

## Maintenance Mode

When **Maintenance Mode** is enabled (in Global Settings):

- All public pages display a "Site Under Maintenance" overlay to visitors
- The admin portal continues to function normally
- Disable it when you are done making changes

---

## Deployment

### Option A — Render.com (recommended free tier)

1. Push all project files to a GitHub repository
2. Go to https://render.com → New → Web Service → connect your repo
3. **Build command:** `npm install`
4. **Start command:** `node server.js`
5. Add your environment variables in the Render dashboard
6. Deploy — Render provides a public HTTPS URL automatically

### Option B — VPS / DigitalOcean / Linux Server

```bash
git clone <your-repo> /var/www/gic-ministry
cd /var/www/gic-ministry
npm install
cp .env.example .env    # then edit .env with real values
node server.js          # or use pm2: pm2 start server.js --name gic
```

### Option C — Static Hosting (Netlify / Vercel / GitHub Pages)

The public pages work on static hosting since all content loads from Firestore in the browser. The Node.js server is optional for the public site.

1. Upload all HTML, CSS, and JS files (exclude `server.js`, `package.json`, `.env`, `admin-config.json`)
2. Ensure `firebase-config.js` contains your real Firebase project credentials

> **Never commit `.env` or `admin-config.json` to a public repository.**
> Add both to your `.gitignore`.

---

## Firestore Security Rules

Paste these into Firebase Console → Firestore Database → Rules → Publish:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    match /siteData/{document=**} {
      allow read: if true;
      allow write: if request.auth != null
                   && request.auth.token.email == 'growinginchristfamily@gmail.com';
    }

    match /gallery/{document=**} {
      allow read: if true;
      allow write: if request.auth != null
                   && request.auth.token.email == 'growinginchristfamily@gmail.com';
    }

    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

---

## Firebase Storage Rules

Paste these into Firebase Console → Storage → Rules → Publish:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null
                   && request.auth.token.email == 'growinginchristfamily@gmail.com';
    }
  }
}
```

---

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `GMAIL_USER` | Yes | Gmail address used to send emails |
| `GMAIL_PASS` | Yes | Gmail App Password (16 characters) |
| `SESSION_SECRET` | Yes | Random secret string for Express sessions |
| `PORT` | No | Server port — defaults to `3000` |
| `NODE_ENV` | No | Set to `production` on a live server |

### Generating a Gmail App Password

1. Enable **2-Step Verification** on your Google account
2. Go to https://myaccount.google.com/apppasswords
3. Select **Mail** → **Other** → name it `GIC Ministry` → Generate
4. Copy the 16-character password into `GMAIL_PASS` in your `.env`

---

## Key Pages Reference

| URL | Description |
|-----|-------------|
| `/` | Homepage — hero, stats, welcome, events, announcements |
| `/about.html` | Mission, vision, leadership team, history timeline |
| `/beliefs.html` | All 28 Fundamental Beliefs of the SDA Church |
| `/ministries.html` | Worship, Youth (Arise), Outreach, Discipleship, Children, Mentorship |
| `/departments.html` | Ushering, Media, Finance, Music, Catering, Prayer |
| `/events.html` | Upcoming events with category filters and regular service times |
| `/give.html` | Online giving — M-Pesa Paybill and WhatsApp submission |
| `/gallery.html` | Photo gallery loaded live from Firestore |
| `/membership.html` | Membership benefits, steps, and application form |
| `/resources.html` | SDA Sabbath School quarterlies and online study tools |
| `/contact.html` | Contact form, service times, office hours, and location |
| `/admin.html` | Admin CMS portal (Firebase Auth required) |

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Cannot log in to admin portal | Confirm the user exists in Firebase Console → Authentication → Users. Email and password must match exactly. |
| `auth/invalid-api-key` error | Your `firebase-config.js` still contains placeholder values. Replace them with your real Firebase project config. |
| Firestore permission denied | Verify your Firestore Security Rules are published and the logged-in email matches the rule condition. |
| Password reset email not arriving | Check your spam folder. The email comes from `noreply@[your-project].firebaseapp.com`. |
| Public pages not updating | Confirm scripts are loaded as ES modules: `<script type="module" src="site-sync.js"></script>`. Check the browser console for Firebase import errors. |
| Gmail emails not sending | Use a Gmail App Password, not your main password. Ensure 2-Step Verification is enabled first. |
| Server won't start | Run `npm install` first. Check Node.js version is 16+: `node --version`. |
| Departments page shows blank | Confirm the container div in `departments.html` has `id="gic-departments-grid"`. |
| Changes visible to admin but not visitors | Check browser console on the public page for Firestore `onSnapshot` errors. Verify Security Rules allow public reads. |

---

## Contact

**Growing in Christ Ministry**
Thika Road, Roysambu, Nairobi, Kenya
Phone: 0705 214 338
Email: info@growinginchrist.org
Website: growinginchrist.org

---

*© 2025 Growing in Christ Ministry. All rights reserved.*
