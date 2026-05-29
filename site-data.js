/* ================================================================
   GROWING IN CHRIST MINISTRY — Site Data Store  v3 (Firestore)
   site-data.js  ·  Load BEFORE layout.js and site-sync.js
   ================================================================
   All shared data lives in Firestore document: siteData/main
   No localStorage used for shared data.
   ================================================================ */

import { db, doc, getDoc, setDoc, onSnapshot }
  from './firebase-config.js';

/* ── DEFAULT DATA ─────────────────────────────────────────────── */
export const DEFAULTS = {

  /* Branding */
  branding: {
    logoTitle:    'Growing in Christ',
    logoSubtitle: 'Ministry — Kenya',
    adminEmail:   'growinginchristfamily@gmail.com',
    logoImage:    '',
  },

  /* Gallery — stored as array of { id, url, caption, category, date } */
  gallery: [],

  /* Departments */
  departments: [
    { name: 'Ushering & Hospitality',   desc: 'Our ushers create a warm, welcoming atmosphere at every service and event.',              head: 'John Mutua',      members: 'Director, Team Leaders, Hosts',       color: 'green', image: '' },
    { name: 'Media & Communications',   desc: 'Managing sound, projection, live streams, and all digital communications.',              head: 'Brian Kariuki',   members: 'Sound, Video, Social Media',          color: 'gold',  image: '' },
    { name: 'Intercessory Prayer',      desc: 'A dedicated team committed to covering the church and community in prayer.',             head: 'Esther Njeri',    members: 'Prayer Warriors, Coordinators',       color: 'green', image: '' },
    { name: 'Finance & Stewardship',    desc: 'Overseeing giving, tithes, offerings, and transparent financial management.',           head: 'David Kamau',     members: 'Treasurer, Accountant, Team',         color: 'blue',  image: '' },
    { name: 'Music & Worship Team',     desc: 'Leading the congregation in Spirit-filled, Word-anchored worship every service.',       head: 'Lydia Auma',      members: 'Choir, Band, Worship Leaders',        color: 'green', image: '' },
    { name: 'Catering & Events',        desc: 'Providing catering, logistics, and event coordination for all church functions.',       head: 'Margaret Wanjiku',members: 'Coordinator, Volunteers',             color: 'gold',  image: '' },
  ],

  /* Homepage */
  homepage: {
    heroHeadline:  'Grow, Serve & Belong in Christ',
    heroSubtext:   'A community of faith devoted to discipleship, worship, and Christ-centred service in the heart of Kenya.',
    ctaPrimary:    'Join Our Community',
    ctaSecondary:  'Learn More',
    heroImage:     '',
    stat1Num:   '15,000+', stat1Label: 'Lives Impacted',
    stat2Num:   '247',     stat2Label: 'Active Members',
    stat3Num:   '12+',     stat3Label: 'Years of Ministry',
    stat4Num:   '6+',      stat4Label: 'Active Ministries',
    verseText:  '"I can do all things through Christ who strengthens me."',
    verseRef:   'Philippians 4:13 (NKJV)',
    welcomeImage: '',
  },

  /* Contact / Service Times */
  contact: {
    phone:          '0705 214 338',
    email:          'info@growinginchrist.org',
    emailPastor:    'pastor@growinginchrist.org',
    address:        'Growing in Christ Ministry\nThika Road, Roysambu\nNairobi, Kenya',
    officeHours:    'Monday – Friday: 9:00 AM – 5:00 PM\nSaturday: 10:00 AM – 2:00 PM',
    service1Label:  'Sunday Early Service',  service1Time: '8:00 AM',
    service2Label:  'Sunday Main Service',   service2Time: '10:00 AM',
    service3Label:  'Wednesday Bible Study', service3Time: '6:30 PM',
    service4Label:  'Friday Youth Night',    service4Time: '6:00 PM',
  },

  /* About */
  about: {
    mission: 'To make disciples of Jesus Christ who live as His loving witnesses and proclaim to all people the everlasting gospel of the Three Angels' Messages in preparation for His soon return.',
    vision:  'In harmony with Bible revelation, we see as the climax of God's plan the restoration of all His creation to full harmony with His perfect will and righteousness — a world made new.',
    slogan:  'Freedom, Healing & Hope',
    motto:   'The Advent Message to All the World in My Generation.',
  },

  /* History Timeline */
  history: [
    { year: '2013', title: 'Founded in a Living Room',     body: 'Growing in Christ Ministry began with a small prayer group of 12 people meeting weekly in Nairobi, Kenya.' },
    { year: '2016', title: 'First Permanent Home',         body: 'The congregation moved into its first dedicated facility and launched the Youth Ministry and Community Outreach programmes.' },
    { year: '2019', title: 'Annual Conference Launched',   body: 'The first annual Growing in Christ conference drew 500 attendees from across Kenya.' },
    { year: '2022', title: 'Expansion & New Ministries',   body: 'Launched Children's Ministry, Mentorship Programme, and began weekly community health outreaches across Nairobi.' },
    { year: '2025', title: '15,000 Lives Impacted',        body: 'A milestone year — the ministry reached 15,000 lives through outreach, discipleship, and conference programmes across Kenya.' },
  ],

  /* Leadership */
  leadership: [
    { initial: 'D', name: 'Ps. David Kimani',  role: 'Senior Pastor',     bio: 'Over 15 years in pastoral ministry with a passion for discipleship and expository preaching rooted in Adventist theology.', photo: '', contact: '' },
    { initial: 'R', name: 'Ps. Ruth Akinyi',   role: 'Associate Pastor',  bio: 'Leads our women's ministry, counselling, and midweek teaching programme.', photo: '', contact: '' },
    { initial: 'S', name: 'Samuel Njoroge',     role: 'Youth Pastor',      bio: 'Building a generation of godly young Adventist believers in the heart of Nairobi.', photo: '', contact: '' },
    { initial: 'M', name: 'Mary Wanjiku',       role: 'Outreach Director', bio: 'Coordinates all community outreach, health missions, and social impact programmes across Nairobi.', photo: '', contact: '' },
  ],

  /* Events */
  events: [
    { day: '15', month: 'June', year: '2025', title: 'Annual Revival Conference',      desc: 'Three days of powerful worship, Bible teaching, testimonies, and equipping for believers from across Kenya. Theme: "Rooted & Established in Christ"', time: '9:00 AM – 9:00 PM', location: 'Main Auditorium, Nairobi', duration: '3 Days',             reg: 'register',  color: '',           image: '' },
    { day: '22', month: 'June', year: '2025', title: 'Community Health Outreach',      desc: 'Free medical checkups, prayer, and Gospel sharing in Mathare Valley.',                                                                               time: '8:00 AM – 3:00 PM', location: 'Mathare Valley, Nairobi', duration: 'Volunteers welcome', reg: 'volunteer', color: 'green-dark', image: '' },
    { day: '05', month: 'July', year: '2025', title: 'Arise Youth Camp',               desc: 'A weekend retreat in Naivasha for young people aged 13–35 featuring worship, outdoor activities, mentorship, and discipleship sessions.',            time: 'Friday – Sunday',   location: 'Naivasha, Rift Valley',   duration: 'Ages 13–35',          reg: 'register',  color: 'green-mid',  image: '' },
    { day: '20', month: 'July', year: '2025', title: 'Leadership & Ministry Training', desc: 'One-day intensive training for ministry leaders, cell group leaders, and anyone called to serve in the church.',                                     time: '9:00 AM – 5:00 PM', location: 'Conference Hall, Nairobi',duration: 'Application required',  reg: 'apply',     color: 'green',      image: '' },
    { day: '03', month: 'Aug',  year: '2025', title: 'Marriage Enrichment Seminar',    desc: 'A one-day seminar for married couples and those preparing for marriage.',                                                                             time: '10:00 AM – 4:00 PM',location: 'Main Auditorium',        duration: 'Couples',             reg: 'rsvp',      color: 'green-deep', image: '' },
  ],

  /* Announcements */
  announcements: [
    { title: 'Annual Revival Conference — June 15–17',     body: 'Three days of worship, Bible teaching, and testimonies. Theme: "Rooted & Established in Christ". All are welcome!', type: 'green' },
    { title: 'Arise Youth Camp Registration Now Open',     body: 'Weekend retreat in Naivasha for ages 13–35. July 5–7. Register via WhatsApp: 0705 214 338', type: 'gold' },
    { title: 'Q3 2025 Sabbath School Quarterly Available', body: 'Download the new quarterly lessons for adults and children on the Resources page.', type: 'blue' },
  ],

  /* Ministries */
  ministries: [
    { icon: '🙏', name: 'Worship & Prayer',          desc: 'Our worship ministry exists to usher the congregation into the presence of God through Spirit-led, Word-anchored worship.', schedule: 'Sunday 8:00 AM & 10:00 AM · Wednesday Prayer 6:30 PM', contact: 'Ps. David Kimani', image: '' },
    { icon: '⚡', name: 'Youth Ministry — "Arise"',  desc: 'A dynamic community for young people aged 13–35, built on discipleship, friendship, and practical faith.',                  schedule: 'Ages 13–35',                                          contact: 'Samuel Njoroge',   image: '' },
    { icon: '❤️', name: 'Community Outreach',         desc: 'We take the love of Christ beyond our walls. From health missions and food distribution to evangelism.',                  schedule: 'Monthly health outreaches · Quarterly evangelism',    contact: 'Mary Wanjiku',    image: '' },
    { icon: '📖', name: 'Discipleship & Training',    desc: 'Systematic Bible training and small group network equip every believer to grow and multiply.',                            schedule: 'New Believers Class · Growing Deeper Bible Study',    contact: '',                 image: '' },
    { icon: '🌟', name: "Children's Ministry",        desc: 'A safe, fun, and faith-filled environment where children aged 0–12 encounter the love of Jesus.',                        schedule: 'Ages 0–12',                                           contact: '',                 image: '' },
    { icon: '🤝', name: 'Mentorship & Care',          desc: 'Connecting believers with experienced mentors for guidance, accountability, and pastoral care.',                          schedule: '',                                                    contact: 'Ps. Ruth Akinyi',  image: '' },
  ],

  /* Beliefs card images (keyed by belief number 1-28) */
  beliefImages: {},

  /* Metadata */
  _version:   1,
  _lastSaved: null,
};

/* ── FIRESTORE DOCUMENT REFERENCE ────────────────────────────── */
const MAIN_DOC = doc(db, 'siteData', 'main');

/* ── GicData PUBLIC API ───────────────────────────────────────── */
const GicData = {

  /** Fetch current data from Firestore (one-time) */
  async get () {
    try {
      const snap = await getDoc(MAIN_DOC);
      if (!snap.exists()) return structuredClone(DEFAULTS);
      return deepMerge(structuredClone(DEFAULTS), snap.data());
    } catch (e) {
      console.warn('[GicData] Firestore read error, using defaults.', e);
      return structuredClone(DEFAULTS);
    }
  },

  /**
   * Write a partial update to Firestore.
   * @param {object} partial  — top-level keys to merge
   */
  async set (partial) {
    try {
      const current = await this.get();
      const next    = deepMerge(current, partial);
      next._lastSaved = new Date().toISOString();
      next._version   = (current._version || 1) + 1;
      await setDoc(MAIN_DOC, next);
      window.dispatchEvent(new CustomEvent('gicDataChanged', { detail: next }));
      return next;
    } catch (e) {
      console.error('[GicData] Firestore write error.', e);
      return null;
    }
  },

  /**
   * Subscribe to real-time updates from Firestore.
   * Calls callback(data) whenever the document changes.
   * Returns the unsubscribe function.
   */
  subscribe (callback) {
    return onSnapshot(MAIN_DOC, (snap) => {
      const data = snap.exists()
        ? deepMerge(structuredClone(DEFAULTS), snap.data())
        : structuredClone(DEFAULTS);
      callback(data);
      window.dispatchEvent(new CustomEvent('gicDataChanged', { detail: data }));
    }, (err) => {
      console.error('[GicData] onSnapshot error:', err);
    });
  },

  defaults: DEFAULTS,
};

/* ── DEEP MERGE UTILITY ───────────────────────────────────────── */
function deepMerge (a, b) {
  if (!b || typeof b !== 'object') return a;
  const out = Object.assign({}, a);
  Object.keys(b).forEach(k => {
    if (Array.isArray(b[k])) {
      out[k] = b[k];
    } else if (b[k] && typeof b[k] === 'object' && a[k] && typeof a[k] === 'object' && !Array.isArray(a[k])) {
      out[k] = deepMerge(a[k], b[k]);
    } else {
      out[k] = b[k];
    }
  });
  return out;
}

/* Expose globally for non-module scripts */
window.GicData = GicData;
export default GicData;
