/* ================================================================
   GROWING IN CHRIST MINISTRY — Real-Time Site Sync  v4
   site-sync.js  ·  Load AFTER site-data.js on every public page
   ================================================================
   Firestore onSnapshot → DOM updates → all visitors see changes
   within 1–2 seconds of admin saving.
   ================================================================ */

import GicData from './site-data.js';

(function () {
  'use strict';

  /* ── DOM HELPERS ─────────────────────────────────────────────── */
  function setText(sel, val) {
    if (val === undefined || val === null) return;
    document.querySelectorAll(sel).forEach(el => { el.textContent = val; });
  }
  function setAttr(sel, attr, val) {
    if (!val) return;
    document.querySelectorAll(sel).forEach(el => el.setAttribute(attr, val));
  }
  function setSrc(sel, val) {
    if (!val) return;
    document.querySelectorAll(sel).forEach(el => {
      if (el.tagName === 'IMG') el.src = val;
      else el.style.backgroundImage = `url(${val})`;
    });
  }
  function setCSSVar(name, val) {
    if (!val) return;
    document.documentElement.style.setProperty(name, val);
  }
  function escHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* ── MAIN APPLY FUNCTION ─────────────────────────────────────── */
  function applyData(d) {
    if (!d) return;

    /* ── GLOBAL SETTINGS ── */
    if (d.siteSettings) {
      const s = d.siteSettings;
      if (s.colorGreen)  setCSSVar('--green',      s.colorGreen);
      if (s.colorGold)   setCSSVar('--gold',        s.colorGold);
      if (s.colorCream)  setCSSVar('--cream',       s.colorCream);
      if (s.colorDeep)   setCSSVar('--green-deep',  s.colorDeep);

      // Update all WhatsApp links if phone changed
      if (s.whatsappNumber) {
        const waNum = s.whatsappNumber.replace(/[^0-9]/g, '');
        document.querySelectorAll('a[href^="https://wa.me/"]').forEach(a => {
          const url  = new URL(a.href);
          const txt  = url.searchParams.get('text');
          a.href = txt
            ? `https://wa.me/${waNum}?text=${encodeURIComponent(txt)}`
            : `https://wa.me/${waNum}`;
        });
      }

      // Maintenance mode — show overlay if on
      handleMaintenance(s.maintenanceMode);
    }

    /* ── CONTACT ── */
    if (d.contact) {
      const c = d.contact;
      setText('[data-gic="phone"]',         c.phone);
      setText('[data-gic="email"]',         c.email);
      setText('[data-gic="emailPastor"]',   c.emailPastor);
      setText('[data-gic="address"]',       c.address);
      setText('[data-gic="officeHours"]',   c.officeHours);

      // Service times from array
      if (Array.isArray(c.serviceTimes)) {
        renderServiceTimes(c.serviceTimes);
      } else {
        // Legacy flat fields
        setText('[data-gic="service1Label"]', c.service1Label);
        setText('[data-gic="service1Time"]',  c.service1Time);
        setText('[data-gic="service2Label"]', c.service2Label);
        setText('[data-gic="service2Time"]',  c.service2Time);
        setText('[data-gic="service3Label"]', c.service3Label);
        setText('[data-gic="service3Time"]',  c.service3Time);
        setText('[data-gic="service4Label"]', c.service4Label);
        setText('[data-gic="service4Time"]',  c.service4Time);
      }

      // Update tel: links
      if (c.phone) {
        const telNum = 'tel:+254' + c.phone.replace(/[^0-9]/g, '').replace(/^0/, '');
        document.querySelectorAll('a[href^="tel:"]').forEach(a => { a.href = telNum; });
      }
    }

    /* ── HOMEPAGE / HERO ── */
    if (d.hero) {
      const h = d.hero;
      setText('[data-gic="heroLabel"]',    h.label);
      setText('[data-gic="heroHeadline"]', h.headline);
      setText('[data-gic="heroSubtext"]',  h.subheading);
      setText('[data-gic="cta1Text"]',     h.cta1Text);
      setText('[data-gic="cta2Text"]',     h.cta2Text);
      setAttr('[data-gic="cta1Url"]',  'href', h.cta1Url);
      setAttr('[data-gic="cta2Url"]',  'href', h.cta2Url);
      if (h.bgImage) setSrc('[data-gic="heroImage"]', h.bgImage);
    }

    // Legacy homepage fields
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
      if (Array.isArray(d.about.stats))     renderStats(d.about.stats);
      if (Array.isArray(d.about.team))      renderLeadership(d.about.team);
    }

    /* ── BRANDING ── */
    if (d.branding) {
      setText('[data-gic="logoTitle"]',    d.branding.logoTitle);
      setText('[data-gic="logoSubtitle"]', d.branding.logoSubtitle);
      if (d.branding.logoImage) setSrc('[data-gic="logoImage"]', d.branding.logoImage);
    }

    /* ── HEADER ── */
    if (d.header) {
      if (d.header.logoUrl) setSrc('[data-gic="logoImage"]', d.header.logoUrl);
      if (d.header.navBg)   setCSSVar('--nav-bg', d.header.navBg);
    }

    /* ── EVENTS ── */
    if (Array.isArray(d.events))      renderEvents(d.events);
    else if (Array.isArray(d.events?.items)) renderEvents(d.events.items);

    /* ── GALLERY ── */
    renderGallery(Array.isArray(d.gallery) ? d.gallery : []);

    /* ── DEPARTMENTS ── */
    const depts = Array.isArray(d.departments) ? d.departments : (d.departments?.items || []);
    renderDepartments(depts);

    /* ── MINISTRIES ── */
    if (Array.isArray(d.ministries)) renderMinistries(d.ministries);

    /* ── HISTORY ── */
    if (Array.isArray(d.history)) renderHistory(d.history);

    /* ── FOOTER ── */
    if (d.footer) {
      const f = d.footer;
      setText('[data-gic="footerName"]',      f.churchName);
      setText('[data-gic="footerTagline"]',   f.tagline);
      setText('[data-gic="footerCopyright"]', f.copyright);
      if (f.bgColor)   setCSSVar('--footer-bg',   f.bgColor);
      if (f.textColor) setCSSVar('--footer-text',  f.textColor);
      if (Array.isArray(f.quickLinks))  renderFooterLinks(f.quickLinks);
      if (Array.isArray(f.socials))     renderFooterSocials(f.socials);
    }

    /* ── GIVE ── */
    if (d.give) {
      const g = d.give;
      setText('[data-gic="mpesaPaybill"]',  g.mpesaPaybill);
      setText('[data-gic="mpesaAccount"]',  g.mpesaAccount);
    }

    /* ── ANNOUNCEMENTS ── */
    if (Array.isArray(d.announcements)) renderAnnouncements(d.announcements);
  }

  /* ── MAINTENANCE OVERLAY ─────────────────────────────────────── */
  function handleMaintenance(active) {
    // Don't show on admin.html itself
    if (location.pathname.includes('admin')) return;
    let overlay = document.getElementById('gic-maintenance-overlay');
    if (active) {
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'gic-maintenance-overlay';
        overlay.style.cssText = `
          position:fixed;inset:0;z-index:99999;
          background:linear-gradient(135deg,#082A17,#0F4425);
          display:flex;flex-direction:column;align-items:center;justify-content:center;
          color:white;font-family:'DM Sans',system-ui,sans-serif;text-align:center;padding:40px;
        `;
        overlay.innerHTML = `
          <div style="font-size:3rem;margin-bottom:24px">🔧</div>
          <h1 style="font-family:'Playfair Display',Georgia,serif;font-size:2rem;margin-bottom:16px">Site Under Maintenance</h1>
          <p style="max-width:480px;color:rgba(255,255,255,0.7);line-height:1.6;font-size:1.05rem">
            We're making some improvements to our website. We'll be back shortly!
          </p>
          <p style="margin-top:24px;color:rgba(255,255,255,0.5);font-size:0.85rem">
            Growing in Christ Ministry · Nairobi, Kenya
          </p>`;
        document.body.appendChild(overlay);
      }
    } else if (overlay) {
      overlay.remove();
    }
  }

  /* ── RENDERER: SERVICE TIMES ─────────────────────────────────── */
  function renderServiceTimes(times) {
    const wrap = document.querySelector('.services-box');
    if (!wrap || !Array.isArray(times)) return;
    const h3 = wrap.querySelector('h3');
    const existing = wrap.querySelectorAll('.service-time');
    existing.forEach(el => el.remove());
    times.forEach(sv => {
      const row = document.createElement('div');
      row.className = 'service-time';
      row.innerHTML = `<span>${escHtml(sv.name)}</span><strong>${escHtml(sv.time)}</strong>`;
      wrap.appendChild(row);
    });
  }

  /* ── RENDERER: STATS ─────────────────────────────────────────── */
  function renderStats(items) {
    const wrap = document.getElementById('gic-stats-grid');
    if (!wrap) return;
    wrap.innerHTML = items.map(st => `
      <div class="stat-item">
        <div class="stat-num" data-gic="stat">${escHtml(st.number)}</div>
        <div class="stat-label">${escHtml(st.label)}</div>
      </div>`).join('');
  }

  /* ── RENDERER: LEADERSHIP ────────────────────────────────────── */
  function renderLeadership(items) {
    const wrap = document.getElementById('gic-leadership-grid');
    if (!wrap || !Array.isArray(items)) return;
    wrap.innerHTML = items.map(l => {
      const avatar = l.photo
        ? `<img src="${escHtml(l.photo)}" alt="${escHtml(l.name)}" style="width:88px;height:88px;border-radius:50%;object-fit:cover;margin:0 auto 16px;display:block">`
        : `<div class="leader-avatar">${escHtml(l.initial || (l.name || 'A').charAt(0))}</div>`;
      return `
        <div class="leader-card">
          ${avatar}
          <h4>${escHtml(l.name)}</h4>
          <span class="role">${escHtml(l.role)}</span>
          <p>${escHtml(l.bio)}</p>
          ${l.contact ? `<a href="mailto:${escHtml(l.contact)}" style="font-size:.8rem;margin-top:8px;display:block">${escHtml(l.contact)}</a>` : ''}
        </div>`;
    }).join('');
  }

  /* ── RENDERER: EVENTS ────────────────────────────────────────── */
  function renderEvents(items) {
    const wrap = document.getElementById('gic-events-list');
    if (!wrap || !Array.isArray(items)) return;
    const WA_BASE = 'https://wa.me/254705214338';
    const regMap = {
      register: { label: 'Register Now', msg: 'Hello, I would like to register for this event.', cls: 'btn-green' },
      volunteer: { label: 'Volunteer',   msg: 'Hello, I would like to volunteer for this event.', cls: 'btn-outline' },
      apply:    { label: 'Apply',        msg: 'Hello, I would like to apply for this training.',  cls: 'btn-outline' },
      rsvp:     { label: 'RSVP',         msg: 'Hello, I would like to RSVP for this event.',      cls: 'btn-outline' },
    };
    const badgeMap = {
      register: 'badge-register', volunteer: 'badge-free',
      apply: 'badge-upcoming',    rsvp: 'badge-free',
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
            <span style="margin-top:2px;font-size:.68rem">${escHtml(ev.year)}</span>
          </div>
          <div class="event-row-body">
            <h3>${escHtml(ev.title)} <span class="event-badge ${bad}">${r.label}</span></h3>
            <p>${escHtml(ev.desc || ev.description || '')}</p>
            <div class="event-row-meta">
              <span>${escHtml(ev.time)}</span>
              <span>${escHtml(ev.location)}</span>
              <span>${escHtml(ev.duration || ev.extraInfo || '')}</span>
            </div>
          </div>
          <div class="event-row-action">
            <a href="${WA_BASE}?text=${encodeURIComponent(r.msg)}" target="_blank" rel="noopener"
               class="btn ${r.cls}" style="white-space:nowrap">${r.label}</a>
          </div>
        </div>`;
    }).join('');
  }

  /* ── RENDERER: GALLERY ───────────────────────────────────────── */
  function renderGallery(items) {
    const grid    = document.getElementById('publicGalleryGrid');
    const empty   = document.getElementById('publicGalleryEmpty');
    const counter = document.getElementById('publicGalleryCount');
    const filterWrap = document.getElementById('publicGalleryFilter');
    if (!grid) return;

    const arr = Array.isArray(items) ? items : [];
    if (counter) counter.textContent = arr.length;

    if (!arr.length) {
      grid.innerHTML = '';
      if (empty) empty.style.display = 'block';
      return;
    }
    if (empty) empty.style.display = 'none';

    // Build category filter buttons dynamically
    if (filterWrap) {
      const cats = [...new Set(arr.map(i => i.category).filter(Boolean))];
      const existing = filterWrap.querySelectorAll('[data-cat]:not([data-cat=""])');
      existing.forEach(b => b.remove());
      cats.forEach(cat => {
        const b = document.createElement('button');
        b.className = 'filter-btn';
        b.dataset.cat = cat;
        b.textContent = cat;
        b.addEventListener('click', () => {
          filterWrap.querySelectorAll('.filter-btn').forEach(x => x.classList.remove('active'));
          b.classList.add('active');
          renderGalleryItems(arr, cat);
        });
        filterWrap.appendChild(b);
      });
      const allBtn = filterWrap.querySelector('[data-cat=""]');
      if (allBtn) {
        const newAll = allBtn.cloneNode(true);
        allBtn.replaceWith(newAll);
        newAll.addEventListener('click', () => {
          filterWrap.querySelectorAll('.filter-btn').forEach(x => x.classList.remove('active'));
          newAll.classList.add('active');
          renderGalleryItems(arr, '');
        });
      }
    }

    renderGalleryItems(arr, '');
  }

  function renderGalleryItems(arr, cat) {
    const grid = document.getElementById('publicGalleryGrid');
    if (!grid) return;
    const filtered = cat ? arr.filter(i => i.category === cat) : arr;
    grid.innerHTML = filtered.map(item => `
      <div class="gallery-item" style="border-radius:10px;overflow:hidden;cursor:pointer;box-shadow:0 4px 16px rgba(15,44,25,.12)"
           onclick="window.open('${escHtml(item.url)}','_blank')">
        <img src="${escHtml(item.url)}" alt="${escHtml(item.caption || '')}"
             style="width:100%;aspect-ratio:1;object-fit:cover;display:block;transition:transform .3s ease">
        ${item.caption ? `<div style="padding:8px 10px;font-family:var(--font-sans);font-size:.78rem;color:var(--mid)">${escHtml(item.caption)}</div>` : ''}
      </div>`).join('');
  }

  /* ── RENDERER: DEPARTMENTS ───────────────────────────────────── */
  function renderDepartments(items) {
    const wrap = document.getElementById('gic-departments-grid');
    if (!wrap || !Array.isArray(items)) return;
    const colorMap = { green: 'var(--green)', gold: 'var(--gold)', blue: '#1565C0' };
    wrap.innerHTML = items.map(dept => {
      const bdr = colorMap[dept.color] || 'var(--green)';
      return `
        <div class="dept-card" style="border-top:4px solid ${bdr}">
          ${dept.image ? `<img src="${escHtml(dept.image)}" alt="${escHtml(dept.name)}" style="width:100%;height:160px;object-fit:cover;border-radius:8px 8px 0 0;margin-bottom:16px">` : ''}
          <h3 style="font-size:1.1rem;margin-bottom:8px">${escHtml(dept.name)}</h3>
          <p style="font-size:.88rem;margin-bottom:12px">${escHtml(dept.desc || dept.description || '')}</p>
          ${dept.head    ? `<p class="dept-meta"><strong>Head:</strong> ${escHtml(dept.head)}</p>` : ''}
          ${dept.members ? `<p class="dept-meta"><strong>Team:</strong> ${escHtml(dept.members)}</p>` : ''}
        </div>`;
    }).join('');
  }

  /* ── RENDERER: MINISTRIES ────────────────────────────────────── */
  function renderMinistries(items) {
    const wrap = document.getElementById('gic-ministries-grid');
    if (!wrap || !Array.isArray(items)) return;
    wrap.innerHTML = items.map(m => `
      <div class="ministry-card-sync">
        <div class="mc-icon">${m.icon || '✝'}</div>
        <h3>${escHtml(m.name)}</h3>
        <p>${escHtml(m.desc || m.description || '')}</p>
        ${m.schedule ? `<p class="mc-schedule">${escHtml(m.schedule)}</p>` : ''}
        ${m.ctaText ? `<a href="${escHtml(m.ctaUrl || 'contact.html')}" class="btn btn-green" style="margin-top:16px;display:inline-flex">${escHtml(m.ctaText)}</a>` : ''}
      </div>`).join('');
  }

  /* ── RENDERER: HISTORY ───────────────────────────────────────── */
  function renderHistory(items) {
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

  /* ── RENDERER: ANNOUNCEMENTS ─────────────────────────────────── */
  function renderAnnouncements(items) {
    const wrap = document.getElementById('gic-announcements');
    if (!wrap || !Array.isArray(items)) return;
    if (!items.length) { wrap.innerHTML = ''; return; }
    wrap.innerHTML = items.map(a => `
      <div class="announcement-item announcement-${a.type || 'green'}">
        <strong>${escHtml(a.title)}</strong>
        <p>${escHtml(a.body)}</p>
      </div>`).join('');
  }

  /* ── RENDERER: FOOTER LINKS ──────────────────────────────────── */
  function renderFooterLinks(links) {
    const wrap = document.getElementById('gic-footer-links');
    if (!wrap) return;
    wrap.innerHTML = links.map(lk =>
      `<li><a href="${escHtml(lk.url)}">${escHtml(lk.label)}</a></li>`
    ).join('');
  }

  /* ── RENDERER: FOOTER SOCIALS ────────────────────────────────── */
  function renderFooterSocials(socials) {
    const wrap = document.getElementById('gic-footer-socials');
    if (!wrap) return;
    const iconMap = {
      'Facebook': 'fa-facebook-f fb',
      'Instagram': 'fa-instagram ig',
      'YouTube': 'fa-youtube yt',
      'WhatsApp': 'fa-whatsapp wa',
      'Twitter / X': 'fa-x-twitter tw',
      'TikTok': 'fa-tiktok',
      'Telegram': 'fa-telegram tg',
    };
    wrap.innerHTML = socials.map(s => {
      const ic = iconMap[s.platform] || 'fa-link';
      const cls = ic.split(' ')[1] || '';
      return `<a href="${escHtml(s.url)}" target="_blank" rel="noopener" class="footer-social ${cls}" title="${escHtml(s.platform)}">
        <i class="fa-brands ${ic.split(' ')[0]}"></i>
      </a>`;
    }).join('');
  }

  /* ── SUBSCRIBE ───────────────────────────────────────────────── */
  GicData.subscribe(applyData);

})();
