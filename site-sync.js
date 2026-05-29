/* ================================================================
   GROWING IN CHRIST MINISTRY — Real-Time Site Sync  v3
   site-sync.js  ·  Load AFTER site-data.js on every public page
   ================================================================
   Uses Firestore onSnapshot to keep all DOM elements up-to-date
   across every device the moment an admin saves a change.
   ================================================================ */

import GicData from './site-data.js';

(function () {
  'use strict';

  /* ── DOM HELPER ─────────────────────────────────────────────── */
  function setText (sel, val) {
    document.querySelectorAll(sel).forEach(el => { if (val !== undefined && val !== null) el.textContent = val; });
  }
  function setHTML (sel, val) {
    document.querySelectorAll(sel).forEach(el => { if (val !== undefined && val !== null) el.innerHTML = val; });
  }
  function setAttr (sel, attr, val) {
    document.querySelectorAll(sel).forEach(el => { if (val) el.setAttribute(attr, val); });
  }
  function setSrc (sel, val) {
    if (!val) return;
    document.querySelectorAll(sel).forEach(el => {
      if (el.tagName === 'IMG') el.src = val;
      else el.style.backgroundImage = `url(${val})`;
    });
  }

  /* ── APPLY DATA TO DOM ───────────────────────────────────────── */
  function applyData (d) {
    if (!d) return;

    /* ── CONTACT / SERVICE TIMES ── */
    if (d.contact) {
      const c = d.contact;
      setText('[data-gic="phone"]',         c.phone);
      setText('[data-gic="email"]',         c.email);
      setText('[data-gic="emailPastor"]',   c.emailPastor);
      setText('[data-gic="address"]',       c.address);
      setText('[data-gic="officeHours"]',   c.officeHours);
      setText('[data-gic="service1Label"]', c.service1Label);
      setText('[data-gic="service1Time"]',  c.service1Time);
      setText('[data-gic="service2Label"]', c.service2Label);
      setText('[data-gic="service2Time"]',  c.service2Time);
      setText('[data-gic="service3Label"]', c.service3Label);
      setText('[data-gic="service3Time"]',  c.service3Time);
      setText('[data-gic="service4Label"]', c.service4Label);
      setText('[data-gic="service4Time"]',  c.service4Time);
      // Update all tel: links
      document.querySelectorAll('a[href^="tel:"]').forEach(a => {
        a.href = 'tel:+254' + c.phone.replace(/[^0-9]/g, '').replace(/^0/, '');
      });
      // Update WhatsApp links phone number
      const waNum = c.phone.replace(/[^0-9]/g, '').replace(/^0/, '254');
      document.querySelectorAll('a[href^="https://wa.me/"]').forEach(a => {
        const url = new URL(a.href);
        const txt = url.searchParams.get('text');
        a.href = txt
          ? `https://wa.me/${waNum}?text=${encodeURIComponent(txt)}`
          : `https://wa.me/${waNum}`;
      });
    }

    /* ── HOMEPAGE ── */
    if (d.homepage) {
      const h = d.homepage;
      setText('[data-gic="heroHeadline"]',  h.heroHeadline);
      setText('[data-gic="heroSubtext"]',   h.heroSubtext);
      setText('[data-gic="ctaPrimary"]',    h.ctaPrimary);
      setText('[data-gic="ctaSecondary"]',  h.ctaSecondary);
      setText('[data-gic="stat1Num"]',      h.stat1Num);
      setText('[data-gic="stat1Label"]',    h.stat1Label);
      setText('[data-gic="stat2Num"]',      h.stat2Num);
      setText('[data-gic="stat2Label"]',    h.stat2Label);
      setText('[data-gic="stat3Num"]',      h.stat3Num);
      setText('[data-gic="stat3Label"]',    h.stat3Label);
      setText('[data-gic="stat4Num"]',      h.stat4Num);
      setText('[data-gic="stat4Label"]',    h.stat4Label);
      setText('[data-gic="verseText"]',     h.verseText);
      setText('[data-gic="verseRef"]',      h.verseRef);
      if (h.heroImage)    setSrc('[data-gic="heroImage"]',    h.heroImage);
      if (h.welcomeImage) setSrc('[data-gic="welcomeImage"]', h.welcomeImage);
    }

    /* ── ABOUT ── */
    if (d.about) {
      setText('[data-gic="mission"]', d.about.mission);
      setText('[data-gic="vision"]',  d.about.vision);
      setText('[data-gic="slogan"]',  d.about.slogan);
      setText('[data-gic="motto"]',   d.about.motto);
    }

    /* ── BRANDING ── */
    if (d.branding) {
      setText('[data-gic="logoTitle"]',    d.branding.logoTitle);
      setText('[data-gic="logoSubtitle"]', d.branding.logoSubtitle);
      if (d.branding.logoImage) setSrc('[data-gic="logoImage"]', d.branding.logoImage);
    }

    /* ── ANNOUNCEMENTS ── */
    renderAnnouncements(d.announcements);

    /* ── EVENTS ── */
    renderEvents(d.events);

    /* ── LEADERSHIP ── */
    renderLeadership(d.leadership);

    /* ── GALLERY ── */
    renderGallery(d.gallery);

    /* ── HISTORY TIMELINE ── */
    renderHistory(d.history);

    /* ── MINISTRIES ── */
    renderMinistries(d.ministries);

    /* ── DEPARTMENTS ── */
    renderDepartments(d.departments);
  }

  /* ── RENDERER: ANNOUNCEMENTS ─────────────────────────────────── */
  function renderAnnouncements (items) {
    const wrap = document.getElementById('gic-announcements');
    if (!wrap || !Array.isArray(items)) return;
    if (!items.length) { wrap.innerHTML = ''; return; }
    wrap.innerHTML = items.map(a => `
      <div class="announcement-item announcement-${a.type || 'green'}">
        <strong>${escHtml(a.title)}</strong>
        <p>${escHtml(a.body)}</p>
      </div>`).join('');
  }

  /* ── RENDERER: EVENTS ────────────────────────────────────────── */
  function renderEvents (items) {
    const wrap = document.getElementById('gic-events-list');
    if (!wrap || !Array.isArray(items)) return;
    const WA_BASE = 'https://wa.me/254705214338';
    const regMap = {
      register: { label: 'Register Now', msg: 'Hello, I would like to register for this event.', cls: 'btn-green' },
      volunteer:{ label: 'Volunteer',    msg: 'Hello, I would like to volunteer for this event.', cls: 'btn-outline' },
      apply:    { label: 'Apply',        msg: 'Hello, I would like to apply for this training.',  cls: 'btn-outline' },
      rsvp:     { label: 'RSVP',         msg: 'Hello, I would like to RSVP for this event.',      cls: 'btn-outline' },
    };
    const badgeMap = {
      register: 'badge-register',
      volunteer:'badge-free',
      apply:    'badge-upcoming',
      rsvp:     'badge-free',
    };
    wrap.innerHTML = items.map(ev => {
      const r   = regMap[ev.reg]   || regMap.register;
      const bad = badgeMap[ev.reg] || 'badge-upcoming';
      const bg  = ev.color ? `style="background:var(--${ev.color})"` : '';
      return `
      <div class="event-row">
        <div class="event-row-date" ${bg}>
          <strong>${escHtml(ev.day)}</strong>
          <span>${escHtml(ev.month)}</span>
          <span style="margin-top:2px;font-size:0.68rem">${escHtml(ev.year)}</span>
        </div>
        <div class="event-row-body">
          <h3>${escHtml(ev.title)} <span class="event-badge ${bad}">${r.label}</span></h3>
          <p>${escHtml(ev.desc)}</p>
          <div class="event-row-meta">
            <span>${escHtml(ev.time)}</span>
            <span>${escHtml(ev.location)}</span>
            <span>${escHtml(ev.duration)}</span>
          </div>
        </div>
        <div class="event-row-action">
          <a href="${WA_BASE}?text=${encodeURIComponent(r.msg)}" target="_blank" rel="noopener"
             class="btn ${r.cls}" style="white-space:nowrap">${r.label}</a>
        </div>
      </div>`;
    }).join('');
  }

  /* ── RENDERER: LEADERSHIP ────────────────────────────────────── */
  function renderLeadership (items) {
    const wrap = document.getElementById('gic-leadership-grid');
    if (!wrap || !Array.isArray(items)) return;
    wrap.innerHTML = items.map(l => {
      const avatar = l.photo
        ? `<img src="${escHtml(l.photo)}" alt="${escHtml(l.name)}" style="width:88px;height:88px;border-radius:50%;object-fit:cover;margin:0 auto 16px">`
        : `<div class="leader-avatar">${escHtml(l.initial)}</div>`;
      return `
      <div class="leader-card">
        ${avatar}
        <h4>${escHtml(l.name)}</h4>
        <span class="role">${escHtml(l.role)}</span>
        <p>${escHtml(l.bio)}</p>
        ${l.contact ? `<a href="mailto:${escHtml(l.contact)}" style="font-size:0.8rem;margin-top:8px;display:block">${escHtml(l.contact)}</a>` : ''}
      </div>`;
    }).join('');
  }

  /* ── RENDERER: GALLERY ───────────────────────────────────────── */
  function renderGallery (items) {
    const grid    = document.getElementById('publicGalleryGrid');
    const empty   = document.getElementById('publicGalleryEmpty');
    const counter = document.getElementById('publicGalleryCount');
    const filter  = document.getElementById('publicGalleryFilter');
    if (!grid) return;

    const arr = Array.isArray(items) ? items : [];
    if (counter) counter.textContent = arr.length;

    if (!arr.length) {
      grid.innerHTML  = '';
      if (empty) empty.style.display = 'block';
      return;
    }
    if (empty) empty.style.display = 'none';

    // Build category filter buttons
    if (filter) {
      const cats = [...new Set(arr.map(i => i.category).filter(Boolean))];
      const existing = filter.querySelectorAll('[data-cat]');
      existing.forEach(b => { if (b.dataset.cat !== '') b.remove(); });
      cats.forEach(cat => {
        const b = document.createElement('button');
        b.className = 'filter-btn';
        b.dataset.cat = cat;
        b.textContent = cat;
        b.addEventListener('click', () => {
          filter.querySelectorAll('.filter-btn').forEach(x => x.classList.remove('active'));
          b.classList.add('active');
          renderGalleryItems(arr, cat);
        });
        filter.appendChild(b);
      });
      const allBtn = filter.querySelector('[data-cat=""]');
      if (allBtn) allBtn.addEventListener('click', () => {
        filter.querySelectorAll('.filter-btn').forEach(x => x.classList.remove('active'));
        allBtn.classList.add('active');
        renderGalleryItems(arr, '');
      });
    }

    renderGalleryItems(arr, '');
  }

  function renderGalleryItems (arr, cat) {
    const grid = document.getElementById('publicGalleryGrid');
    if (!grid) return;
    const filtered = cat ? arr.filter(i => i.category === cat) : arr;
    grid.innerHTML = filtered.map(item => `
      <div class="gallery-item" style="border-radius:10px;overflow:hidden;cursor:pointer;box-shadow:0 4px 16px rgba(15,44,25,0.12);"
           onclick="window.open('${escHtml(item.url)}','_blank')">
        <img src="${escHtml(item.url)}" alt="${escHtml(item.caption || '')}"
             style="width:100%;aspect-ratio:1;object-fit:cover;display:block;transition:transform 0.3s ease;">
        ${item.caption ? `<div style="padding:8px 10px;font-family:var(--font-sans);font-size:0.78rem;color:var(--mid)">${escHtml(item.caption)}</div>` : ''}
      </div>`).join('');
  }

  /* ── RENDERER: HISTORY ───────────────────────────────────────── */
  function renderHistory (items) {
    const wrap = document.getElementById('gic-history-timeline');
    if (!wrap || !Array.isArray(items)) return;
    wrap.innerHTML = items.map((item, i) => `
      <div class="timeline-item-v3 ${i % 2 === 0 ? 'tl-left' : 'tl-right'}">
        <div class="timeline-year-v3">${escHtml(item.year)}</div>
        <div class="timeline-content-v3">
          <h4>${escHtml(item.title)}</h4>
          <p>${escHtml(item.body)}</p>
        </div>
      </div>`).join('');
  }

  /* ── RENDERER: MINISTRIES ────────────────────────────────────── */
  function renderMinistries (items) {
    const wrap = document.getElementById('gic-ministries-grid');
    if (!wrap || !Array.isArray(items)) return;
    wrap.innerHTML = items.map(m => `
      <div class="ministry-card-sync">
        <div class="mc-icon">${m.icon || '✝'}</div>
        <h3>${escHtml(m.name)}</h3>
        <p>${escHtml(m.desc)}</p>
        ${m.schedule ? `<p class="mc-schedule">${escHtml(m.schedule)}</p>` : ''}
      </div>`).join('');
  }

  /* ── RENDERER: DEPARTMENTS ───────────────────────────────────── */
  function renderDepartments (items) {
    const wrap = document.getElementById('gic-departments-grid');
    if (!wrap || !Array.isArray(items)) return;
    const colorMap = { green: 'var(--green)', gold: 'var(--gold)', blue: '#1565C0' };
    wrap.innerHTML = items.map(dept => {
      const bdr = colorMap[dept.color] || 'var(--green)';
      return `
      <div class="dept-card" style="border-top:4px solid ${bdr}">
        ${dept.image ? `<img src="${escHtml(dept.image)}" alt="${escHtml(dept.name)}" style="width:100%;height:160px;object-fit:cover;border-radius:8px 8px 0 0;margin-bottom:16px">` : ''}
        <h3 style="font-size:1.1rem;margin-bottom:8px">${escHtml(dept.name)}</h3>
        <p style="font-size:0.88rem;margin-bottom:12px">${escHtml(dept.desc)}</p>
        <p class="dept-meta"><strong>Head:</strong> ${escHtml(dept.head)}</p>
        <p class="dept-meta"><strong>Team:</strong> ${escHtml(dept.members)}</p>
      </div>`;
    }).join('');
  }

  /* ── ESCAPE UTILITY ──────────────────────────────────────────── */
  function escHtml (str) {
    return String(str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  /* ── SUBSCRIBE ───────────────────────────────────────────────── */
  GicData.subscribe(applyData);

})();
