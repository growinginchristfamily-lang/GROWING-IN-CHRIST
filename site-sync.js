/* ================================================================
   GROWING IN CHRIST MINISTRY — Public Page Sync  v2
   site-sync.js  ·  Load AFTER site-data.js, AFTER layout.js
   ================================================================ */

(function () {
  'use strict';

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  window.addEventListener('gicDataChanged', init);

  function init () {
    if (!window.GicData) return;
    const d = GicData.get();
    const page = (location.pathname.split('/').pop() || 'index.html').replace(/\?.*$/, '');

    patchContactBar(d);
    patchFooterContact(d);
    patchAnnouncementBanner(d);
    patchBranding(d);

    if (page === 'index.html' || page === '') { patchHomepage(d); patchGallerySection(d); patchDepartmentsSection(d); }
    if (page === 'events.html')    patchEvents(d);
    if (page === 'about.html')     patchAbout(d);
    if (page === 'contact.html')   patchContactPage(d);
    if (page === 'ministries.html') patchMinistriesPage(d);
    if (page === 'gallery.html')   patchGalleryPage(d);
  }

  /* ── BRANDING ── */
  function patchBranding (d) {
    const b = d.branding || {};
    document.querySelectorAll('.nav-logo-text strong').forEach(el => { if (b.logoTitle) el.textContent = b.logoTitle; });
    document.querySelectorAll('.nav-logo-text span').forEach(el => { if (b.logoSubtitle) el.textContent = b.logoSubtitle; });
    if (b.logoImage) {
      document.querySelectorAll('.nav-logo-icon, .footer-logo-icon, .sidebar-logo-icon').forEach(iconEl => {
        iconEl.innerHTML = `<img src="${b.logoImage}" alt="Logo" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`;
      });
    }
  }

  /* ── TOP BAR ── */
  function patchContactBar (d) {
    const c = d.contact;
    document.querySelectorAll('.top-bar a[href^="mailto"]').forEach(a => {
      a.href = 'mailto:' + c.email;
      a.textContent = ' ' + c.email;
    });
    document.querySelectorAll('.top-bar a[href^="tel"]').forEach(a => {
      a.href = 'tel:+254' + c.phone.replace(/\D/g, '').replace(/^0/, '');
      a.textContent = ' ' + c.phone;
    });
  }

  /* ── FOOTER ── */
  function patchFooterContact (d) {
    const c = d.contact;
    document.querySelectorAll('.footer-contact-item').forEach(item => {
      const icon = item.querySelector('.footer-contact-icon');
      if (!icon) return;
      const txt = icon.textContent.trim();
      const p = item.querySelector('p, span:last-child');
      const a = item.querySelector('a');
      if (txt === '') {
        const span = item.querySelectorAll('span')[1];
        if (span) span.innerHTML = c.address.replace(/\n/g, '<br>');
      }
      if (txt === '') {
        if (a) { a.textContent = c.phone; a.href = 'tel:' + c.phone.replace(/\D/g,''); }
      }
      if (txt === '') {
        if (a) { a.textContent = c.email; a.href = 'mailto:' + c.email; }
      }
      if (txt === '') {
        const span = item.querySelectorAll('span')[1];
        if (span) span.innerHTML = 'Sunday: ' + c.service1Time + ' &amp; ' + c.service2Time + '<br>Wednesday: ' + c.service3Time;
      }
    });
  }

  /* ── ANNOUNCEMENT BANNER ── */
  function patchAnnouncementBanner (d) {
    const ann = d.announcements;
    if (!ann || ann.length === 0) return;
    if (document.getElementById('gic-announce-bar')) return;
    const first = ann[0];
    const colorMap = { gold: '#C8962A', blue: '#1565C0', green: '#1B6B3A' };
    const bg = colorMap[first.type] || '#1B6B3A';
    const bar = document.createElement('div');
    bar.id = 'gic-announce-bar';
    bar.style.cssText = `background:${bg};color:white;text-align:center;padding:9px 48px 9px 16px;
      font-family:'DM Sans',sans-serif;font-size:0.82rem;font-weight:500;position:relative;
      letter-spacing:0.01em;line-height:1.4;z-index:9999`;
    bar.innerHTML = `<strong>${esc(first.title)}</strong>
      <span style="opacity:0.85;margin-left:8px">${esc(first.body)}</span>
      <button onclick="this.parentElement.remove()" style="position:absolute;right:12px;top:50%;
        transform:translateY(-50%);background:none;border:none;color:white;font-size:1.1rem;
        cursor:pointer;opacity:0.7;line-height:1">&times;</button>`;
    const navbar = document.querySelector('.navbar');
    if (navbar) navbar.parentNode.insertBefore(bar, navbar);
    else document.body.insertAdjacentElement('afterbegin', bar);
  }

  /* ── HOMEPAGE ── */
  function patchHomepage (d) {
    const h = d.homepage;

    const heroH1 = document.querySelector('.hero-content h1');
    if (heroH1 && h.heroHeadline) heroH1.textContent = h.heroHeadline;

    const heroP = document.querySelector('.hero-content p');
    if (heroP && h.heroSubtext) heroP.textContent = h.heroSubtext;

    // Hero background image
    if (h.heroImage) {
      const hero = document.querySelector('.hero');
      if (hero) {
        hero.style.backgroundImage = `url(${h.heroImage})`;
        hero.style.backgroundSize = 'cover';
        hero.style.backgroundPosition = 'center';
      }
    }

    // Welcome image
    if (h.welcomeImage) {
      const wImg = document.querySelector('.welcome-image img');
      if (wImg) wImg.src = h.welcomeImage;
      else {
        const wImgWrap = document.querySelector('.welcome-image');
        if (wImgWrap) wImgWrap.innerHTML = `<img src="${h.welcomeImage}" style="width:100%;border-radius:12px;box-shadow:var(--shadow-lg);" alt="Welcome">`;
      }
    }

    // Stats
    const statNums   = document.querySelectorAll('.stats-grid .stat-num');
    const statLabels = document.querySelectorAll('.stats-grid .stat-label');
    [[h.stat1Num, h.stat1Label],[h.stat2Num, h.stat2Label],[h.stat3Num, h.stat3Label],[h.stat4Num, h.stat4Label]].forEach(([num, label], i) => {
      if (statNums[i])   statNums[i].textContent   = num   || '';
      if (statLabels[i]) statLabels[i].textContent = label || '';
    });

    // Scripture
    const verseBlock = document.querySelector('.welcome-verse blockquote');
    const verseRef   = document.querySelector('.welcome-verse cite');
    if (verseBlock && h.verseText) verseBlock.textContent = h.verseText;
    if (verseRef   && h.verseRef)  verseRef.textContent   = h.verseRef;

    // Events grid
    const eventsGrid = document.querySelector('.events-grid');
    if (eventsGrid && d.events && d.events.length) {
      const cards = eventsGrid.querySelectorAll('.event-card');
      d.events.slice(0, 3).forEach((ev, i) => {
        const card = cards[i];
        if (!card) return;
        const dayEl   = card.querySelector('.event-card-date strong');
        const monthEl = card.querySelector('.event-card-date span');
        const titleEl = card.querySelector('h3');
        const descEl  = card.querySelector('p');
        if (dayEl)   dayEl.textContent   = ev.day;
        if (monthEl) monthEl.textContent = ev.month + ' ' + ev.year;
        if (titleEl) titleEl.textContent = ev.title;
        if (descEl)  descEl.textContent  = ev.desc.substring(0, 120) + (ev.desc.length > 120 ? '\u2026' : '');

        // Event card image
        if (ev.image) {
          const dateBar = card.querySelector('.event-card-date');
          if (dateBar && !card.querySelector('.event-card-img')) {
            const imgEl = document.createElement('div');
            imgEl.className = 'event-card-img';
            imgEl.style.cssText = 'height:140px;overflow:hidden;border-radius:10px 10px 0 0;margin:-0px';
            imgEl.innerHTML = `<img src="${ev.image}" style="width:100%;height:100%;object-fit:cover" alt="${esc(ev.title)}">`;
            card.insertBefore(imgEl, card.firstChild);
          }
        }
      });
    }

    // Ministry card images from ministries data
    if (d.ministries) {
      const miniCards = document.querySelectorAll('.ministries-grid .ministry-card');
      d.ministries.forEach((m, i) => {
        const card = miniCards[i];
        if (!card || !m.image) return;
        const iconEl = card.querySelector('.ministry-icon');
        if (iconEl) {
          iconEl.style.backgroundImage = `url(${m.image})`;
          iconEl.style.backgroundSize = 'cover';
          iconEl.style.backgroundPosition = 'center';
          iconEl.innerHTML = '';
        }
      });
    }

    // Beliefs card images
    if (d.beliefImages) {
      document.querySelectorAll('.blog-grid .card').forEach((card, i) => {
        const imgDiv = card.querySelector('div[style*="height:180px"]');
        const key = String(i + 1);
        if (imgDiv && d.beliefImages[key]) {
          imgDiv.style.backgroundImage = `url(${d.beliefImages[key]})`;
          imgDiv.style.backgroundSize = 'cover';
          imgDiv.style.backgroundPosition = 'center';
          imgDiv.innerHTML = '';
        }
      });
    }
  }

  /* ── GALLERY SECTION (homepage) ── */
  function patchGallerySection(d) {
    const gallery = d.gallery || [];
    const sec = document.getElementById('galleryHomeSection');
    if (!sec) return;

    if (!gallery.length) {
      sec.style.display = 'none';
      return;
    }
    sec.style.display = '';

    const grid = sec.querySelector('.gallery-home-grid');
    if (!grid) return;
    grid.innerHTML = gallery.slice(0, 9).map((img, i) => `
      <div class="gallery-home-item" onclick="openLightbox(${i})" style="cursor:pointer;border-radius:10px;overflow:hidden;aspect-ratio:1;background:var(--cream);box-shadow:var(--shadow)">
        <img src="${img.src}" alt="${esc(img.caption||'')}" style="width:100%;height:100%;object-fit:cover;display:block;transition:transform 0.4s ease" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
        ${img.caption ? `<div style="position:absolute;bottom:0;left:0;right:0;padding:8px 12px;background:linear-gradient(transparent,rgba(8,42,23,0.75));color:white;font-size:0.75rem;font-family:var(--font-sans)">${esc(img.caption)}</div>` : ''}
      </div>`).join('');

    // Wrap items in relative div for caption overlay
    grid.querySelectorAll('.gallery-home-item').forEach(el => { el.style.position = 'relative'; });

    // Build lightbox data
    window._galleryData = gallery;
  }

  /* ── DEPARTMENTS SECTION (homepage) ── */
  function patchDepartmentsSection(d) {
    const depts = d.departments || [];
    const sec = document.getElementById('departmentsHomeSection');
    if (!sec) return;
    const grid = sec.querySelector('.departments-grid');
    if (!grid) return;

    const colorMap = { green:'var(--green)', gold:'var(--gold)', blue:'#1565C0' };
    grid.innerHTML = depts.map(dept => {
      const clr = colorMap[dept.color] || 'var(--green)';
      return `
      <div class="dept-home-card" style="background:var(--white);border-radius:12px;overflow:hidden;box-shadow:var(--shadow);transition:transform 0.3s ease;border-top:4px solid ${clr}" onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform='translateY(0)'">
        ${dept.image ? `<div style="height:160px;overflow:hidden"><img src="${dept.image}" alt="${esc(dept.name)}" style="width:100%;height:100%;object-fit:cover"></div>` : `<div style="height:80px;background:linear-gradient(135deg,${clr}22,${clr}44);display:flex;align-items:center;justify-content:center;font-size:2rem;color:${clr};opacity:0.5"><i class="fa-solid fa-sitemap"></i></div>`}
        <div style="padding:22px 20px">
          <h4 style="font-family:var(--font-display);font-size:1rem;margin-bottom:6px;color:var(--dark)">${esc(dept.name)}</h4>
          <p style="font-size:0.85rem;color:var(--mid);margin-bottom:12px">${esc(dept.desc)}</p>
          ${dept.head ? `<div style="font-family:var(--font-sans);font-size:0.75rem;color:${clr};font-weight:600">Head: ${esc(dept.head)}</div>` : ''}
        </div>
      </div>`;
    }).join('');
  }

  /* ── EVENTS PAGE ── */
  function patchEvents (d) {
    if (!d.events || !d.events.length) return;
    const list = document.querySelector('.events-list');
    if (!list) return;

    const WA = 'https://wa.me/254705214338';
    const regLabels = {
      register: { label: 'Register Now', btn: 'btn-green', msg: encodeURIComponent('Hello, I would like to register for this event.') },
      volunteer:{ label: 'Volunteer',    btn: 'btn-outline', msg: encodeURIComponent('Hello, I would like to volunteer for the Community Health Outreach.') },
      apply:    { label: 'Apply',        btn: 'btn-outline', msg: encodeURIComponent('Hello, I would like to apply for the Leadership and Ministry Training.') },
      rsvp:     { label: 'RSVP',         btn: 'btn-outline', msg: encodeURIComponent('Hello, I would like to RSVP for this event.') },
    };
    const colorMap = { '':'var(--gold)', 'green-dark':'var(--green-dark)', 'green-mid':'var(--green-mid)', 'green':'var(--green)', 'green-deep':'var(--green-deep)' };

    list.innerHTML = d.events.map(ev => {
      const reg = regLabels[ev.reg] || regLabels.register;
      const bg  = colorMap[ev.color] || 'var(--gold)';
      const waHref = `${WA}?text=${reg.msg}`;
      const imgHtml = ev.image ? `<div style="height:120px;overflow:hidden"><img src="${ev.image}" alt="${esc(ev.title)}" style="width:100%;height:100%;object-fit:cover"></div>` : '';
      return `
      <div class="event-row">
        ${imgHtml}
        <div class="event-row-date" style="background:${bg}">
          <strong>${esc(ev.day)}</strong>
          <span>${esc(ev.month)}</span>
          <span style="margin-top:2px;font-size:0.68rem">${esc(ev.year)}</span>
        </div>
        <div class="event-row-body">
          <h3>${esc(ev.title)}</h3>
          <p>${esc(ev.desc)}</p>
          <div class="event-row-meta">
            <span>&#128337; ${esc(ev.time)}</span>
            <span>&#128205; ${esc(ev.location)}</span>
            <span>${esc(ev.duration)}</span>
          </div>
        </div>
        <div class="event-row-action">
          <a href="${waHref}" target="_blank" rel="noopener"
             class="btn ${reg.btn}" style="white-space:nowrap">${esc(reg.label)}</a>
        </div>
      </div>`;
    }).join('');
  }

  /* ── ABOUT PAGE ── */
  function patchAbout (d) {
    document.querySelectorAll('.mvv-card').forEach(card => {
      const labelEl = card.querySelector('.label');
      const bodyP   = card.querySelector('p');
      if (!labelEl || !bodyP) return;
      const lbl = labelEl.textContent.trim().toLowerCase();
      if (lbl.includes('mission') && d.about.mission) bodyP.textContent = d.about.mission;
      if (lbl.includes('vision')  && d.about.vision)  bodyP.textContent = d.about.vision;
      if (lbl.includes('slogan')  && d.about.slogan) {
        const h3 = card.querySelector('h3');
        if (h3) h3.textContent = d.about.slogan;
      }
    });

    const mottoH2 = document.querySelector('.motto-banner h2');
    if (mottoH2 && d.about.motto) mottoH2.textContent = '\u201c' + d.about.motto + '\u201d';

    // History timeline
    const timeline = document.querySelector('.history-timeline');
    if (timeline && d.history && d.history.length) {
      timeline.innerHTML = d.history.map((h, i) => {
        const isLeft = (i % 2 === 0);
        const contentHtml = `<div class="timeline-content"><h4>${esc(h.title)}</h4><p>${esc(h.body)}</p></div>`;
        const yearHtml    = `<div class="timeline-year">${esc(h.year)}</div>`;
        const emptyHtml   = `<div class="timeline-empty"></div>`;
        return `<div class="timeline-item">
          ${isLeft ? contentHtml : emptyHtml}
          ${yearHtml}
          ${isLeft ? emptyHtml : contentHtml}
        </div>`;
      }).join('');
    }

    // Leadership cards with photos and WhatsApp contact
    const leaderGrid = document.querySelector('.leadership-grid');
    if (leaderGrid && d.leadership && d.leadership.length) {
      leaderGrid.innerHTML = d.leadership.map(l => {
        const avatarHtml = l.photo
          ? `<div class="leader-avatar" style="background:none;overflow:hidden;padding:0"><img src="${l.photo}" alt="${esc(l.name)}" style="width:100%;height:100%;object-fit:cover;border-radius:50%"></div>`
          : `<div class="leader-avatar">${esc(l.initial || (l.name ? l.name[0] : '?'))}</div>`;
        const waNum = (l.contact || '').replace(/\D/g, '').replace(/^0/, '254');
        const waHtml = waNum
          ? `<a href="https://wa.me/${waNum}?text=Hello%20${encodeURIComponent(l.name)}%2C%20I%20got%20your%20contact%20from%20the%20Growing%20in%20Christ%20website." target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:5px;margin-top:10px;font-family:var(--font-sans);font-size:0.76rem;color:#25D366;font-weight:600;text-decoration:none"><span style="width:20px;height:20px;background:#25D366;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;color:white;font-size:0.7rem">&#9993;</span> WhatsApp</a>`
          : '';
        return `
        <div class="leader-card">
          ${avatarHtml}
          <h4>${esc(l.name)}</h4>
          <span class="role">${esc(l.role)}</span>
          <p>${esc(l.bio || '')}</p>
          ${waHtml}
        </div>`;
      }).join('');
    }
  }

  /* ── CONTACT PAGE ── */
  function patchContactPage (d) {
    const c = d.contact;
    document.querySelectorAll('.contact-info-item').forEach(item => {
      const icon = item.querySelector('.contact-icon');
      if (!icon) return;
      const emoji = icon.textContent.trim();
      const p = item.querySelector('p');
      if (!p) return;
      if (emoji === 'Loc') p.innerHTML = c.address.replace(/\n/g, '<br>');
      if (emoji === 'Tel') p.innerHTML = c.phone;
      if (emoji === 'Mail') p.innerHTML = c.email + '<br>' + c.emailPastor;
      if (emoji === 'Hrs') p.innerHTML = c.officeHours.replace(/\n/g, '<br>');
    });

    const serviceTimes = document.querySelectorAll('.service-time');
    [{ label: c.service1Label, time: c.service1Time }, { label: c.service2Label, time: c.service2Time }, { label: c.service3Label, time: c.service3Time }, { label: c.service4Label, time: c.service4Time }]
      .forEach((s, i) => {
        if (!serviceTimes[i]) return;
        const span   = serviceTimes[i].querySelector('span');
        const strong = serviceTimes[i].querySelector('strong');
        if (span)   span.textContent   = s.label;
        if (strong) strong.textContent = s.time;
      });
  }

  /* ── MINISTRIES PAGE ── */
  function patchMinistriesPage(d) {
    if (!d.ministries || !d.ministries.length) return;
    const sections = document.querySelectorAll('.ministry-section');
    d.ministries.forEach((m, i) => {
      const sec = sections[i];
      if (!sec) return;
      if (m.image) {
        const visual = sec.querySelector('.ministry-visual');
        if (visual) {
          visual.style.backgroundImage = `url(${m.image})`;
          visual.style.backgroundSize = 'cover';
          visual.style.backgroundPosition = 'center';
          visual.innerHTML = '';
        }
      }
    });
  }

  /* ── GALLERY PUBLIC PAGE ── */
  function patchGalleryPage (d) {
    const grid = document.getElementById('publicGalleryGrid');
    const empty = document.getElementById('publicGalleryEmpty');
    const countEl = document.getElementById('publicGalleryCount');
    if (!grid) return;
    const gallery = d.gallery || [];
    window._galleryData = gallery;
    if (countEl) countEl.textContent = gallery.length;
    if (!gallery.length) {
      grid.innerHTML = '';
      if (empty) empty.style.display = 'block';
      return;
    }
    if (empty) empty.style.display = 'none';
    // Build category filter
    const cats = [...new Set(gallery.map(g => g.category).filter(Boolean))];
    const filterBar = document.getElementById('publicGalleryFilter');
    if (filterBar && cats.length) {
      filterBar.innerHTML = '<button class="filter-btn active" data-cat="">All Photos</button>' +
        cats.map(c => `<button class="filter-btn" data-cat="${esc(c)}">${esc(c)}</button>`).join('');
      filterBar.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function () {
          filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
          this.classList.add('active');
          const cat = this.dataset.cat;
          renderGalleryItems(gallery, cat, grid);
        });
      });
    }
    renderGalleryItems(gallery, '', grid);
  }

  function renderGalleryItems (gallery, cat, grid) {
    const filtered = cat ? gallery.filter(g => g.category === cat) : gallery;
    window._galleryData = filtered;
    grid.innerHTML = filtered.map((img, i) => `
      <div class="gallery-item" onclick="openLightbox(${i})" style="cursor:pointer;border-radius:10px;overflow:hidden;box-shadow:var(--shadow);aspect-ratio:1;background:var(--green-pale);position:relative">
        <img src="${img.src}" alt="${esc(img.caption || '')}" style="width:100%;height:100%;object-fit:cover;display:block;transition:transform 0.3s ease" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'">
        ${img.category ? `<div style="position:absolute;top:8px;left:8px;background:var(--green);color:white;font-family:var(--font-sans);font-size:0.62rem;font-weight:700;padding:2px 8px;border-radius:10px;letter-spacing:0.06em">${esc(img.category)}</div>` : ''}
        ${img.caption ? `<div style="position:absolute;bottom:0;left:0;right:0;background:linear-gradient(transparent,rgba(8,42,23,0.75));padding:20px 10px 8px;color:white;font-family:var(--font-sans);font-size:0.72rem;font-weight:500">${esc(img.caption)}</div>` : ''}
      </div>`).join('');
  }

  /* ── LIGHTBOX (gallery) ── */
  window.openLightbox = function(idx) {
    const data = window._galleryData || [];
    if (!data.length) return;
    let current = idx;

    const overlay = document.createElement('div');
    overlay.id = 'gicLightbox';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(8,42,23,0.94);z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px';
    overlay.innerHTML = `
      <button onclick="document.getElementById('gicLightbox').remove()" style="position:absolute;top:20px;right:24px;background:none;border:none;color:white;font-size:2rem;cursor:pointer;z-index:2">&times;</button>
      <button id="lbPrev" onclick="moveLb(-1)" style="position:absolute;left:20px;top:50%;transform:translateY(-50%);background:rgba(255,255,255,0.1);border:none;color:white;font-size:1.5rem;cursor:pointer;width:44px;height:44px;border-radius:50%">&#8592;</button>
      <div id="lbContent" style="max-width:800px;width:100%;text-align:center">
        <img id="lbImg" src="${data[current].src}" alt="" style="max-height:75vh;max-width:100%;border-radius:10px;box-shadow:0 8px 40px rgba(0,0,0,0.5)">
        <div id="lbCaption" style="color:rgba(255,255,255,0.8);margin-top:12px;font-family:'DM Sans',sans-serif;font-size:0.9rem">${data[current].caption||''}</div>
        <div style="color:rgba(255,255,255,0.4);margin-top:6px;font-size:0.75rem">${current+1} / ${data.length}</div>
      </div>
      <button id="lbNext" onclick="moveLb(1)" style="position:absolute;right:20px;top:50%;transform:translateY(-50%);background:rgba(255,255,255,0.1);border:none;color:white;font-size:1.5rem;cursor:pointer;width:44px;height:44px;border-radius:50%">&#8594;</button>`;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });

    window.moveLb = function(dir) {
      current = (current + dir + data.length) % data.length;
      document.getElementById('lbImg').src = data[current].src;
      document.getElementById('lbCaption').textContent = data[current].caption || '';
    };
  };

  function esc (str) {
    return String(str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  }

}());
