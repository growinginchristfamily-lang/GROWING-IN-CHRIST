# Growing in Christ Ministry — Website

**Live URL:** https://growinginchrist.org  
**Stack:** Pure HTML · CSS · Vanilla JS (no build step required)

---

## 📁 File Structure

```
/
├── index.html          — Homepage
├── about.html          — About the ministry
├── departments.html    — Service teams
├── events.html         — Events & gatherings
├── ministries.html     — Ministry areas
├── membership.html     — Membership application
├── give.html           — Online giving (M-Pesa / WhatsApp)
├── gallery.html        — Photo gallery
├── resources.html      — Sabbath school & study resources
├── beliefs.html        — 28 Fundamental Beliefs
├── ellen-white.html    — Ellen G. White writings
├── contact.html        — Contact form (WhatsApp-powered)
├── styles.css          — Global stylesheet
├── layout.js           — Shared navbar, top-bar & footer
├── Images/             — All images (Logo.jpeg, gallery photos, etc.)
├── render.yaml         — Render static site config
├── sitemap.xml         — SEO sitemap
├── robots.txt          — SEO robots
└── 404.html            — Custom error page
```

---

## 🚀 Deploy to Render (via GitHub)

### Step 1 — Push to GitHub

```bash
# In your project folder
git init
git add .
git commit -m "Initial launch commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/growing-in-christ.git
git push -u origin main
```

### Step 2 — Create Render Static Site

1. Go to **https://render.com** and sign up / log in
2. Click **New → Static Site**
3. Connect your GitHub account and select the `growing-in-christ` repo
4. Configure:
   - **Name:** `growing-in-christ-ministry`
   - **Branch:** `main`
   - **Root Directory:** *(leave blank)*
   - **Build Command:** *(leave blank — no build needed)*
   - **Publish Directory:** `.`
5. Click **Create Static Site**

Render will deploy in ~1 minute. You'll get a free URL like:  
`https://growing-in-christ-ministry.onrender.com`

### Step 3 — Add Custom Domain on Render (optional now)

1. In Render dashboard → your site → **Settings → Custom Domains**
2. Add `growinginchrist.org` and `www.growinginchrist.org`
3. Render will show you DNS records to add at your domain registrar

---

## 🌐 Migrate to Hostinger (when ready)

### Option A — Upload files via File Manager

1. Log in to Hostinger hPanel
2. Go to **File Manager → public_html**
3. Upload all files (including the `Images/` folder)
4. Your site is live immediately

### Option B — Deploy via Git (Hostinger Git Integration)

1. In hPanel → **Advanced → Git**
2. Connect your GitHub repo
3. Set branch to `main`, directory to `public_html`
4. Click **Deploy**

### Point your domain to Hostinger

Update your domain's nameservers to Hostinger's:
```
ns1.dns-parking.com
ns2.dns-parking.com
```
*(Check Hostinger hPanel → Domains for the exact nameservers assigned to your account)*

---

## ✏️ Making Updates

### Update gallery photos

Edit the `images` array in `gallery.html` (search for `var images = [`):

```js
{ src: 'Images/your-photo.jpg', title: 'Event Name', date: '2025-08-07' },
```

### Update events

Edit the event rows in `events.html`.

### Update contact / WhatsApp number

Search for `254705214338` across all files and replace with the new number.

### Add new department cards

Copy a `.dept-card` block in `departments.html` and update the text.

---

## 📞 Key Contact Details (in code)

| Field | Value |
|-------|-------|
| WhatsApp | +254 705 214 338 |
| Email | growinginchristfamily@gmail.com |
| Finance contact | 0798981285 |

---

## 🔍 SEO

- Update `sitemap.xml` whenever you add new pages
- All pages have `<meta description>` and Open Graph tags
- `robots.txt` allows full indexing

---

*May this ministry website bring many into the Kingdom. — Soli Deo Gloria*
