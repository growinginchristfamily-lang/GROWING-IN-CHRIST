/* =========================================================
   GROWING IN CHRIST MINISTRY — Shared Layout Components
   ========================================================= */

(function () {
/* Load Font Awesome */
if (!document.getElementById('gic-fa-icons')) { const fa=document.createElement('link'); fa.id='gic-fa-icons'; fa.rel='stylesheet'; fa.href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css'; document.head.appendChild(fa);} 
  /*  WhatsApp Registration Link  */
  const WA_REGISTER = "https://wa.me/254705214338?text=Hello%2C%20I%20would%20like%20to%20register%20for%20an%20upcoming%20event%20at%20Growing%20in%20Christ%20Ministry.";
  const WA_VOLUNTEER = "https://wa.me/254705214338?text=Hello%2C%20I%20would%20like%20to%20volunteer%20for%20an%20upcoming%20outreach%20event.";
  const WA_APPLY     = "https://wa.me/254705214338?text=Hello%2C%20I%20would%20like%20to%20apply%20for%20the%20Leadership%20and%20Ministry%20Training%20programme.";
  const WA_RSVP      = "https://wa.me/254705214338?text=Hello%2C%20I%20would%20like%20to%20RSVP%20for%20the%20Marriage%20Enrichment%20Seminar.";
  const WA_MEMBER    = "https://wa.me/254705214338?text=Hello%2C%20I%20would%20like%20to%20start%20the%20membership%20process%20at%20Growing%20in%20Christ%20Ministry.";

  /*  Top Bar  */
  const topBar = `
  <div class="top-bar">
    <div class="container">
      <div class="top-bar-left">
        <a href="mailto:info@growinginchrist.org"> info@growinginchrist.org</a>
        <a href="tel:+254705214338"> 0705 214 338</a>
      </div>
      <div class="top-bar-right">
        <a href="https://www.facebook.com/GrowingInChristMinistryKenya" target="_blank" rel="noopener" class="social-icon" title="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
        <a href="https://www.instagram.com/growinginchristministry" target="_blank" rel="noopener" class="social-icon" title="Instagram"><i class="fa-brands fa-instagram"></i></a>
        <a href="https://www.youtube.com/@GrowingInChristMinistry" target="_blank" rel="noopener" class="social-icon" title="YouTube"><i class="fa-brands fa-youtube"></i></a>
        <a href="https://wa.me/254705214338" target="_blank" rel="noopener" class="social-icon" title="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
      </div>
    </div>
  </div>`;

  /*  Navbar  */
  const navbar = `
  <nav class="navbar">
    <div class="container">
      <a href="index.html" class="nav-logo">
        <div class="nav-logo-icon"><i class="fa-solid fa-church"></i></div>
        <div class="nav-logo-text">
          <strong>Growing in Christ</strong>
          <span>Ministry — Kenya</span>
        </div>
      </a>
      <div class="nav-links">
        <a href="index.html">Home</a>
        <a href="about.html">About</a>
        <a href="ministries.html">Ministries</a>
        <a href="events.html">Events</a>
        <div class="nav-dropdown">
          <a href="#">Resources</a>
          <div class="dropdown-menu">
            <a href="resources.html#quarterly"> Sabbath School Quarterly</a>
            <a href="resources.html#online"> Online Resources</a>
            <a href="beliefs.html">28 Fundamental Beliefs</a>
            <a href="ellen-white.html">Ellen G. White</a>
            <a href="gallery.html">Photo Gallery</a>
            <a href="ministries.html#worship">Worship &amp; Prayer</a>
            <a href="ministries.html#youth">Youth Ministry</a>
            <a href="ministries.html#outreach">Community Outreach</a>
            <a href="ministries.html#discipleship">Discipleship</a>
            <a href="ministries.html#children">Children's Ministry</a>
          </div>
        </div>
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
        <div class="nav-logo-icon" style="background:var(--green-mid)"></div>
        <div class="nav-logo-text">
          <strong style="color:white">Growing in Christ</strong>
          <span>Ministry</span>
        </div>
      </div>
      <button class="mobile-nav-close" id="mobileNavClose"></button>
    </div>
    <a href="index.html">Home</a>
    <a href="about.html">About Us</a>
    <a href="ministries.html">Ministries</a>
    <a href="events.html">Events</a>
    <a href="resources.html">Resources</a>
    <a href="resources.html#quarterly">   Quarterly Lessons</a>
    <a href="beliefs.html">28 Fundamental Beliefs</a>
    <a href="ellen-white.html">Ellen G. White</a>
    <a href="gallery.html">Photo Gallery</a>
    <a href="contact.html">Contact</a>
    <a href="give.html" style="color:var(--green-light);margin-top:16px">Give Online ↗</a>
  </div>`;

  /*  Footer  */
  const footer = `
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="footer-logo">
            <div class="footer-logo-icon"></div>
            <div class="footer-logo-text">
              <strong>Growing in Christ</strong>
              <span>Ministry — Kenya</span>
            </div>
          </div>
          <p>A community devoted to spiritual growth, discipleship, and Christ-centred service. We exist to make disciples of Jesus Christ who live as His loving witnesses.</p>
          <div class="footer-socials" style="margin-top:20px">
            <a href="https://www.facebook.com/GrowingInChristMinistryKenya" target="_blank" rel="noopener" class="footer-social fb" title="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
            <a href="https://www.instagram.com/growinginchristministry" target="_blank" rel="noopener" class="footer-social ig" title="Instagram">&#9737;</a>
            <a href="https://www.youtube.com/@GrowingInChristMinistry" target="_blank" rel="noopener" class="footer-social yt" title="YouTube"><i class="fa-brands fa-youtube"></i></a>
            <a href="https://wa.me/254705214338" target="_blank" rel="noopener" class="footer-social wa" title="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
            <a href="https://t.me/growinginchristministry" target="_blank" rel="noopener" class="footer-social tg" title="Telegram"></a>
            <a href="https://twitter.com/GICMinistryKE" target="_blank" rel="noopener" class="footer-social tw" title="X / Twitter"></a>
          </div>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><a href="about.html">About Us</a></li>
            <li><a href="events.html">Events</a></li>
            <li><a href="resources.html">Resources</a></li>
            <li><a href="beliefs.html">28 Fundamental Beliefs</a></li>
            <li><a href="ellen-white.html">Ellen G. White</a></li>
            <li><a href="gallery.html">Photo Gallery</a></li>
            <li><a href="ministries.html">Ministries</a></li>
            <li><a href="give.html">Give Online</a></li>
            <li><a href="membership.html">Membership</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4>Resources</h4>
          <ul>
            <li><a href="resources.html#quarterly"> Adult Quarterly Lessons</a></li>
            <li><a href="resources.html#quarterly"> Children's Quarterly</a></li>
            <li><a href="resources.html#online"> Online Study Tools</a></li>
            <li><a href="ministries.html#worship">Worship &amp; Prayer</a></li>
            <li><a href="ministries.html#discipleship">Discipleship</a></li>
          </ul>
        </div>
        <div>
          <h4>Contact Information</h4>
          <div class="footer-contact-item">
            <span class="footer-contact-icon"></span>
            <span>Growing in Christ Ministry<br>Thika Road, Roysambu<br>Nairobi, Kenya</span>
          </div>
          <div class="footer-contact-item">
            <span class="footer-contact-icon"></span>
            <a href="tel:+254705214338" style="color:rgba(255,255,255,0.65)">0705 214 338</a>
          </div>
          <div class="footer-contact-item">
            <span class="footer-contact-icon"></span>
            <a href="mailto:info@growinginchrist.org" style="color:rgba(255,255,255,0.65)">info@growinginchrist.org</a>
          </div>
          <div class="footer-contact-item">
            <span class="footer-contact-icon"></span>
            <span>Sunday: 8 AM &amp; 10 AM<br>Wednesday: 6:30 PM</span>
          </div>
          <div style="margin-top:16px;padding:14px;background:rgba(255,255,255,0.06);border-radius:8px;border-left:3px solid var(--green-light)">
            <p style="font-size:0.8rem;font-style:italic;color:rgba(255,255,255,0.7);line-height:1.5">"The Advent message to all the world in my generation."<br><span style="color:var(--green-light);font-size:0.72rem;font-style:normal">— SDA Motto</span></p>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="footer-bottom">
        <span>© 2025 Growing in Christ Ministry. All rights reserved.</span>
        <span><a href="#">Privacy Policy</a> · <a href="#">Terms of Use</a></span>
      </div>
    </div>
  </footer>`;

  /*  Inject  */
  const body = document.body;
  body.insertAdjacentHTML('afterbegin', navbar);
  body.insertAdjacentHTML('afterbegin', topBar);
  body.insertAdjacentHTML('beforeend', footer);

  /*  Active link  */
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(a => {
    if (a.getAttribute('href') === currentPage) a.classList.add('active');
  });

  /*  Hamburger  */
  const hamburger = document.getElementById('hamburgerBtn');
  const mobileNav = document.getElementById('mobileNav');
  const closeBtn  = document.getElementById('mobileNavClose');
  if (hamburger) hamburger.addEventListener('click', () => mobileNav.classList.add('open'));
  if (closeBtn)  closeBtn.addEventListener('click',  () => mobileNav.classList.remove('open'));

  /*  Redirect registration / event action buttons to WhatsApp  */
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('a.btn, button.btn').forEach(function (el) {
      const text = (el.textContent || el.innerText || '').trim().toLowerCase();
      const href = (el.getAttribute('href') || '').toLowerCase();

      // Match any register/volunteer/apply/rsvp button pointing to contact.html or events.html
      if (
        href.includes('contact.html') || href.includes('events.html') || href === '#'
      ) {
        if (text.includes('register') || text.includes('sign up')) {
          el.setAttribute('href', WA_REGISTER);
          el.setAttribute('target', '_blank');
          el.setAttribute('rel', 'noopener');
        } else if (text.includes('volunteer')) {
          el.setAttribute('href', WA_VOLUNTEER);
          el.setAttribute('target', '_blank');
          el.setAttribute('rel', 'noopener');
        } else if (text.includes('apply')) {
          el.setAttribute('href', WA_APPLY);
          el.setAttribute('target', '_blank');
          el.setAttribute('rel', 'noopener');
        } else if (text.includes('rsvp')) {
          el.setAttribute('href', WA_RSVP);
          el.setAttribute('target', '_blank');
          el.setAttribute('rel', 'noopener');
        }
      }

      // Membership submission button
      if (text.includes('submit application') || text.includes('become a member')) {
        if (el.tagName === 'BUTTON' || href.includes('membership') || href === '#' || !href) {
          el.addEventListener('click', function (e) {
            e.preventDefault();
            window.open(WA_MEMBER, '_blank');
          });
        } else {
          el.setAttribute('href', WA_MEMBER);
          el.setAttribute('target', '_blank');
          el.setAttribute('rel', 'noopener');
        }
      }
    });

    /* Membership form submit button (is a <button>, not <a>) */
    document.querySelectorAll('button.btn-green').forEach(function(btn) {
      const text = (btn.textContent || '').trim().toLowerCase();
      if (text.includes('submit application')) {
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          window.open(WA_MEMBER, '_blank');
        });
      }
    });
  });

})();
