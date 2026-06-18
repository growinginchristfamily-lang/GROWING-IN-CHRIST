/* =========================================================
   GROWING IN CHRIST MINISTRY — Shared Layout Components
   layout.js  v3 — Firebase Edition
   =========================================================
   - Injects top-bar, navbar (with Departments link), footer
   - Footer socials: WhatsApp, Facebook, YouTube, Instagram, Twitter ONLY
   - No Telegram
   ========================================================= */

(function () {
  'use strict';

  /* Load Font Awesome */
  if (!document.getElementById('gic-fa-icons')) {
    const fa = document.createElement('link');
    fa.id   = 'gic-fa-icons';
    fa.rel  = 'stylesheet';
    fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css';
    document.head.appendChild(fa);
  }

  /* WhatsApp base number */
  const WA_NUM = '254705214338';
  const WA = (msg) => `https://wa.me/${WA_NUM}?text=${encodeURIComponent(msg)}`;

  const WA_REGISTER = WA('Hello, I would like to register for an upcoming event at Growing in Christ Ministry.');
  const WA_VOLUNTEER= WA('Hello, I would like to volunteer for an upcoming outreach event.');
  const WA_APPLY    = WA('Hello, I would like to apply for the Leadership and Ministry Training programme.');
  const WA_RSVP     = WA('Hello, I would like to RSVP for the Marriage Enrichment Seminar.');
  const WA_MEMBER   = WA('Hello, I would like to start the membership process at Growing in Christ Ministry.');

  /* ── TOP BAR ── */
  const topBar = `
  <div class="top-bar">
    <div class="container">
      <div class="top-bar-left">
        <a href="mailto:growinginchristfamily@gmail.com"><i class="fa-solid fa-envelope" style="margin-right:5px"></i>growinginchristfamily@gmail.com</a>
        <a href="tel:+254705214338"><i class="fa-solid fa-phone" style="margin-right:5px"></i>0705 214 338</a>
      </div>
      <div class="top-bar-right">
        <a href="https://www.facebook.com/GrowingInChristMinistryKenya" target="_blank" rel="noopener" class="social-icon" title="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
        <a href="https://www.instagram.com/growinginchristministry"      target="_blank" rel="noopener" class="social-icon" title="Instagram"><i class="fa-brands fa-instagram"></i></a>
        <a href="https://www.youtube.com/@GrowingInChristministry"       target="_blank" rel="noopener" class="social-icon" title="YouTube"><i class="fa-brands fa-youtube"></i></a>
        <a href="https://wa.me/${WA_NUM}"                                target="_blank" rel="noopener" class="social-icon" title="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
      </div>
    </div>
  </div>`;

  /* ── NAVBAR ── */
  const navbar = `
  <nav class="navbar">
    <div class="container">
      <a href="index.html" class="nav-logo"><div class="nav-logo-icon"><img src="Logo.jpeg" alt="Circular ministry logo with a stylized open book and leaf inside a green and gold circle representing Growing in Christ Ministry" style="width:46px;height:46px;border-radius:50%;object-fit:cover"></div>
        <div class="nav-logo-text">
        
          <strong>Growing in Christ</strong>
          <span>Ministry — Kenya</span>
        </div>
      </a>
      <div class="nav-links">
        <a href="index.html">Home</a>
        <a href="about.html">About</a>
        <a href="departments.html">Departments</a>
        <a href="events.html">Events</a>
        <div class="nav-dropdown">
          <a href="#">Resources</a>
          <div class="dropdown-menu">
            <a href="resources.html#quarterly"><i class="fa-solid fa-book-open" style="margin-right:7px;color:var(--green)"></i>Sabbath School Quarterly</a>
            <a href="resources.html#online"><i class="fa-solid fa-globe" style="margin-right:7px;color:var(--green)"></i>Online Resources</a>
            <a href="beliefs.html"><i class="fa-solid fa-cross" style="margin-right:7px;color:var(--green)"></i>28 Fundamental Beliefs</a>
            <a href="ellen-white.html"><i class="fa-solid fa-book" style="margin-right:7px;color:var(--green)"></i>Ellen G. White</a>
          </div>
        </div>
        <a href="gallery.html">Gallery</a>
        <a href="membership.html">Membership</a>
        <a href="contact.html">Contact</a>
      </div>
      <a href="give.html" class="btn btn-green nav-cta">Give Online</a>
      <div class="hamburger" id="hamburgerBtn">
        <span></span><span></span><span></span>
      </div>
    </div>
  </nav>
  <div class="mobile-nav" id="mobileNav">
    <div class="mobile-nav-header">
      <div class="nav-logo">
        <div class="nav-logo-icon" style="background:var(--white)"><img src="Logo.jpeg" alt="Circular ministry logo with a stylized open book and leaf inside a green and gold circle representing Growing in Christ Ministry shown in mobile navigation header" style="width:40px;height:40px;border-radius:50%;object-fit:cover"></div>
        <div class="nav-logo-text">
          <strong style="color:white">Growing in Christ</strong>
          <span>Ministry</span>
        </div>
      </div>
      <button class="mobile-nav-close" id="mobileNavClose">&#10005;</button>
    </div>
    <a href="index.html">Home</a>
    <a href="about.html">About Us</a>
    <a href="departments.html">Departments</a>
    <a href="events.html">Events</a>
    <a href="resources.html">Resources</a>
    <a href="resources.html#quarterly">&nbsp;&nbsp;Quarterly Lessons</a>
    <a href="beliefs.html">&nbsp;&nbsp;28 Fundamental Beliefs</a>
    <a href="ellen-white.html">&nbsp;&nbsp;Ellen G. White</a>
    <a href="gallery.html">Photo Gallery</a>
    <a href="membership.html">Membership</a>
    <a href="contact.html">Contact</a>
    <a href="give.html" style="color:var(--green-light);margin-top:16px">Give Online ↗</a>
  </div>`;

  /* ── FOOTER — no Telegram ── */
  const footer = `
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="footer-logo">
            <div class="footer-logo-icon"><img src="Logo.jpeg" alt="Circular ministry logo with a stylized open book and leaf inside a green and gold circle representing Growing in Christ Ministry in the footer" style="width:44px;height:44px;border-radius:50%;object-fit:cover"></div>
            <div class="footer-logo-text">
              <strong>Growing in Christ</strong>
              <span>Ministry — Kenya</span>
            </div>
          </div>
          <p>A community devoted to spiritual growth, discipleship, and Christ-centred service. We exist to make disciples of Jesus Christ who live as His loving witnesses.</p>
          <div class="footer-socials" style="margin-top:20px">
            <a href="https://www.facebook.com/GrowingInChristMinistryKenya" target="_blank" rel="noopener" class="footer-social fb" title="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
            <a href="https://www.instagram.com/growinginchristministry"      target="_blank" rel="noopener" class="footer-social ig" title="Instagram"><i class="fa-brands fa-instagram"></i></a>
            <a href="https://www.youtube.com/@GrowingInChristMinistry"       target="_blank" rel="noopener" class="footer-social yt" title="YouTube"><i class="fa-brands fa-youtube"></i></a>
            <a href="https://wa.me/${WA_NUM}"                                target="_blank" rel="noopener" class="footer-social wa" title="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
            <a href="https://twitter.com/GICMinistryKE"                      target="_blank" rel="noopener" class="footer-social tw" title="X / Twitter"><i class="fa-brands fa-x-twitter"></i></a>
          </div>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><a href="about.html">About Us</a></li>
            <li><a href="departments.html">Departments</a></li>
            <li><a href="events.html">Events</a></li>
            <li><a href="resources.html">Resources</a></li>
            <li><a href="beliefs.html">28 Fundamental Beliefs</a></li>
            <li><a href="ellen-white.html">Ellen G. White</a></li>
            <li><a href="gallery.html">Photo Gallery</a></li>
            <li><a href="give.html">Give Online</a></li>
            <li><a href="membership.html">Membership</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4>Resources</h4>
          <ul>
            <li><a href="resources.html#quarterly">Adult Quarterly Lessons</a></li>
            <li><a href="resources.html#quarterly">Children's Quarterly</a></li>
            <li><a href="resources.html#online">Online Study Tools</a></li>
            <li><a href="beliefs.html">28 Fundamental Beliefs</a></li>
            <li><a href="ellen-white.html">Ellen G. White Writings</a></li>
          </ul>
        </div>
        <div>
          <h4>Contact Information</h4>
          <div class="footer-contact-item">
            <span class="footer-contact-icon"><i class="fa-solid fa-location-dot"></i></span>
            <span>Growing in Christ Ministry<br>Nairobi, Kenya</span>
          </div>
          <div class="footer-contact-item">
            <span class="footer-contact-icon"><i class="fa-solid fa-phone"></i></span>
            <a href="tel:+254705214338" style="color:rgba(255,255,255,0.65)">0705 214 338</a>
          </div>
          <div class="footer-contact-item">
            <span class="footer-contact-icon"><i class="fa-solid fa-envelope"></i></span>
            <a href="mailto:growinginchristfamily@gmail.com" style="color:rgba(255,255,255,0.65)">growinginchristfamily@gmail.com</a>
          </div>
          <div style="margin-top:16px;padding:14px;background:rgba(255,255,255,0.06);border-radius:8px;border-left:3px solid var(--green-light)">
            <p style="font-size:0.8rem;font-style:italic;color:rgba(255,255,255,0.7);line-height:1.5">
              "The Advent message to all the world in my generation."<br>
              <span style="color:var(--green-light);font-size:0.72rem;font-style:normal">— SDA Motto</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="footer-bottom">
        <span>© 2026 Growing in Christ Ministry. All rights reserved.</span>
        <span><a href="#">Privacy Policy</a> · <a href="#">Terms of Use</a></span>
      </div>
    </div>
  </footer>`;

  /* ── INJECT ── */
  const body = document.body;
  body.insertAdjacentHTML('afterbegin', navbar);
  body.insertAdjacentHTML('afterbegin', topBar);
  body.insertAdjacentHTML('beforeend', footer);

  /* ── ACTIVE LINK HIGHLIGHTING ── */
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(a => {
    if (a.getAttribute('href') === currentPage) a.classList.add('active');
  });

  /* ── HAMBURGER ── */
  const hamburger = document.getElementById('hamburgerBtn');
  const mobileNav = document.getElementById('mobileNav');
  const closeBtn  = document.getElementById('mobileNavClose');
  if (hamburger) hamburger.addEventListener('click', () => mobileNav.classList.add('open'));
  if (closeBtn)  closeBtn.addEventListener('click',  () => mobileNav.classList.remove('open'));
  document.addEventListener('click', e => {
    if (mobileNav && mobileNav.classList.contains('open') && !mobileNav.contains(e.target) && !hamburger.contains(e.target)) {
      mobileNav.classList.remove('open');
    }
  });

  /* ── ACTION BUTTON REDIRECTS ── */
  // Run directly after inject (not inside DOMContentLoaded) so timing is
  // explicit and not dependent on script load order.
  function rewireActionButtons () {
    document.querySelectorAll('a.btn, button.btn').forEach(function (el) {
      const text = (el.textContent || el.innerText || '').trim().toLowerCase();
      const href = (el.getAttribute('href') || '').toLowerCase();
      if (href.includes('contact.html') || href.includes('events.html') || href === '#') {
        if      (text.includes('register') || text.includes('sign up')) { el.setAttribute('href', WA_REGISTER); el.setAttribute('target', '_blank'); el.setAttribute('rel', 'noopener'); }
        else if (text.includes('volunteer'))                             { el.setAttribute('href', WA_VOLUNTEER); el.setAttribute('target', '_blank'); el.setAttribute('rel', 'noopener'); }
        else if (text.includes('apply'))                                 { el.setAttribute('href', WA_APPLY); el.setAttribute('target', '_blank'); el.setAttribute('rel', 'noopener'); }
        else if (text.includes('rsvp'))                                  { el.setAttribute('href', WA_RSVP); el.setAttribute('target', '_blank'); el.setAttribute('rel', 'noopener'); }
      }
      if (text.includes('submit application') || text.includes('become a member')) {
        el.addEventListener('click', function (e) { e.preventDefault(); window.open(WA_MEMBER, '_blank'); });
      }
    });
  }
  // Run immediately (injected HTML is already in DOM); also re-run after
  // DOMContentLoaded to catch any buttons already in the page HTML.
  rewireActionButtons();
  document.addEventListener('DOMContentLoaded', rewireActionButtons);

})();
