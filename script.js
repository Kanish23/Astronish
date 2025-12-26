const ROUTE_MAP = {
  astronomy: 'Bala_astro6.html',
  astrophysics: 'astrophysics.html',
  signup: 'signup.html',
  login: 'login.html',
  username: 'username.html',
  home: 'index.html',
  'Bala_astro6.html': 'Bala_astro6.html'
};
const ALLOWED_PATHS = new Set(Object.values(ROUTE_MAP));

function safeNavigate(target) {
  let path = ROUTE_MAP[target];

  // If not a key, checks if it's a direct filename that exists in our map
  if (!path && Object.values(ROUTE_MAP).includes(target)) {
    path = target;
  }

  if (path) {
    window.location.href = path;
    return;
  }
  console.warn('Blocked unsafe navigation to:', target);
  window.location.href = 'index.html';
}
window.safeNavigate = safeNavigate;

function navigateTo(page) { safeNavigate(page); }
function goBack() { window.history.back(); }

const firebaseConfig = {
  apiKey: "AIzaSyDdsM6Y0XSIuB24w5P0wQT5JvTxkr4QV2Y",
  authDomain: "astronish-bd18d.firebaseapp.com",
  projectId: "astronish-bd18d",
  storageBucket: "astronish-bd18d.firebasestorage.app",
  messagingSenderId: "232257360387",
  appId: "1:232257360387:web:fd9f82a09f585df6a33436",
  measurementId: "G-X41L76SELD"
};

// initialize Firebase only once
if (window.firebase && (!firebase.apps || !firebase.apps.length)) {
  firebase.initializeApp(firebaseConfig);
}

function handleAuthState(user) {
  const welcomeEl = document.getElementById('welcomeMessage');
  const signupLink = document.getElementById('signupLink');
  const loginLink = document.getElementById('loginLink');
  const userArea = document.getElementById('user-area');

  if (user) {
    const name = user.displayName || (user.email ? user.email.split('@')[0] : 'User');
    if (welcomeEl) welcomeEl.textContent = `Welcome, ${name}`;
    if (signupLink) signupLink.style.display = 'none';
    if (loginLink) loginLink.style.display = 'none';

    if (userArea) {
      userArea.innerHTML = '';
      const avatarBtn = document.createElement('button');
      avatarBtn.className = 'user-avatar';
      avatarBtn.type = 'button';
      if (user.photoURL) {
        const img = document.createElement('img');
        img.src = user.photoURL;
        img.alt = name;
        avatarBtn.appendChild(img);
      } else {
        avatarBtn.textContent = name.charAt(0).toUpperCase();
      }

      const menu = document.createElement('div');
      menu.className = 'user-menu hidden';

      // Use existing global button styles (or simple cleaner text buttons as per CSS)
      // User wanted reuse of existing classes. "primary-button" might be too big for menu, 
      // but we can add specific classes if needed or just use the styled button from CSS.
      menu.innerHTML = `
        <button id="editProfile" type="button">Edit Profile</button>
        <button id="signOut" type="button">Sign Out</button>
      `;

      userArea.appendChild(avatarBtn);
      userArea.appendChild(menu);

      avatarBtn.addEventListener('click', () => menu.classList.toggle('hidden'));

      const signOutBtn = menu.querySelector('#signOut');
      const editBtn = menu.querySelector('#editProfile');
      if (signOutBtn) signOutBtn.addEventListener('click', async () => { await firebase.auth().signOut(); safeNavigate('home'); });
      if (editBtn) editBtn.addEventListener('click', () => { safeNavigate('username'); });
    }
  } else {
    if (welcomeEl) welcomeEl.textContent = '';
    if (signupLink) signupLink.style.display = '';
    if (loginLink) loginLink.style.display = '';
    const ua = document.getElementById('user-area');
    if (ua) ua.innerHTML = '';
  }
}

// register listener (only if firebase is present)
if (window.firebase) {
  firebase.auth().onAuthStateChanged(handleAuthState);
}

// DOM ready: init carousel + arrow handling
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.button-container').forEach(container => {
    const children = () => Array.from(container.querySelectorAll('.button-wrapper'));

    function getCenteredIndex() {
      const items = children(); if (!items.length) return 0;
      const center = container.scrollLeft + container.clientWidth / 2;
      let best = 0, bestDist = Infinity;
      items.forEach((it, i) => {
        const itCenter = it.offsetLeft + it.offsetWidth / 2;
        const d = Math.abs(itCenter - center);
        if (d < bestDist) { bestDist = d; best = i; }
      });
      return best;
    }

    function scrollToIndex(i) {
      const items = children(); if (!items.length) return;
      i = Math.max(0, Math.min(items.length - 1, i));
      items[i].scrollIntoView({ behavior: 'smooth', inline: 'center' });
      setTimeout(updateActive, 360);
    }

    function updateActive() {
      const items = children(); if (!items.length) return;
      const idx = getCenteredIndex();
      items.forEach((it, i) => it.classList.toggle('active', i === idx));
    }

    if (children().length) scrollToIndex(0);
    updateActive();

    let scrollTimer = null;
    container.addEventListener('scroll', () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(updateActive, 120);
    });

    if (!container.hasAttribute('tabindex')) container.tabIndex = 0;
    container.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); scrollToIndex(getCenteredIndex() + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); scrollToIndex(getCenteredIndex() - 1); }
    });
  });

  // arrow click handler (global)
  document.addEventListener('click', (e) => {
    const nextBtn = e.target.closest('.carousel-next');
    const prevBtn = e.target.closest('.carousel-prev');
    if (!nextBtn && !prevBtn) return;

    const wrap = (nextBtn || prevBtn).closest('.button-container-wrap');
    if (!wrap) return;
    const container = wrap.querySelector('.button-container');
    if (!container) return;

    const items = Array.from(container.querySelectorAll('.button-wrapper'));
    if (!items.length) return;

    const center = container.scrollLeft + container.clientWidth / 2;
    let best = 0, bestDist = Infinity;
    items.forEach((it, i) => {
      const itCenter = it.offsetLeft + it.offsetWidth / 2;
      const d = Math.abs(itCenter - center);
      if (d < bestDist) { bestDist = d; best = i; }
    });

    const target = nextBtn ? best + 1 : best - 1;
    const i = Math.max(0, Math.min(items.length - 1, target));
    items[i].scrollIntoView({ behavior: 'smooth', inline: 'center' });
    setTimeout(() => items.forEach((it, idx) => it.classList.toggle('active', idx === i)), 360);
  });

});
