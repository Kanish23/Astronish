
function navigateTo(page) {
    window.location.href = page;
}


function goBack() {
    window.history.back();
}

const firebaseConfig = {
  apiKey: "AIzaSyDdsM6Y0XSIuB24w5P0wQT5JvTxkr4QV2Y",
  authDomain: "astronish-bd18d.firebaseapp.com",
  projectId: "astronish-bd18d",
  storageBucket: "astronish-bd18d.firebasestorage.app",
  messagingSenderId: "232257360387",
  appId: "1:232257360387:web:fd9f82a09f585df6a33436",
  measurementId: "G-X41L76SELD"
};


firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    let displayName = user.displayName;
    if (!displayName && user.email) {
      displayName = user.email.split('@')[0];
    }
    const welcomeEl = document.getElementById('welcomeMessage');
    if (welcomeEl) {
      welcomeEl.textContent = `Welcome, ${displayName}`;
    }
  } else {
    // User not logged in, you can clear the message or redirect
    const welcomeEl = document.getElementById('welcomeMessage');
    if (welcomeEl) {
      welcomeEl.textContent = '';
    }
 
  }
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.button-container').forEach(container => {
    const children = () => Array.from(container.querySelectorAll('.button-wrapper'));

    function getCenteredIndex() {
      const items = children();
      if (!items.length) return 0;
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
      const items = children();
      if (!items.length) return;
      i = Math.max(0, Math.min(items.length - 1, i));
      items[i].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      // update active after smooth scroll (give it a moment)
      setTimeout(() => updateActive(container), 320);
    }

    function updateActive(containerEl) {
      const items = children();
      if (!items.length) return;
      const center = containerEl.scrollLeft + containerEl.clientWidth / 2;
      let best = 0, bestDist = Infinity;
      items.forEach((it, i) => {
        const itCenter = it.offsetLeft + it.offsetWidth / 2;
        const d = Math.abs(itCenter - center);
        if (d < bestDist) { bestDist = d; best = i; }
      });
      items.forEach((it, i) => it.classList.toggle('active', i === best));
    }

    // wire prev/next buttons (assumes .carousel-prev/.carousel-next sit in parent wrapper)
    const parent = container.parentElement;
    const prevBtn = parent ? parent.querySelector('.carousel-prev') : null;
    const nextBtn = parent ? parent.querySelector('.carousel-next') : null;

    if (nextBtn) nextBtn.addEventListener('click', () => scrollToIndex(getCenteredIndex() + 1));
    if (prevBtn) prevBtn.addEventListener('click', () => scrollToIndex(getCenteredIndex() - 1));

    // center the first item on load so the first button appears in the page center
    // (the next button will sit to the right)
    scrollToIndex(0);

    // update active initially and after scrolling stops
    updateActive(container);
    let scrollTimer = null;
    container.addEventListener('scroll', () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => updateActive(container), 100);
    });

    // keyboard arrow support when focused
    container.tabIndex = 0;
    container.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); scrollToIndex(getCenteredIndex() + 1); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); scrollToIndex(getCenteredIndex() - 1); }
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  function scrollContainerToIndex(container, targetIndex) {
    const items = Array.from(container.querySelectorAll('.button-wrapper'));
    if (!items.length) return;
    const i = Math.max(0, Math.min(items.length - 1, targetIndex));
    items[i].scrollIntoView({ behavior: 'smooth', inline: 'center' });
    // mark active after animation
    setTimeout(() => {
      items.forEach((it, idx) => it.classList.toggle('active', idx === i));
    }, 320);
  }

  document.addEventListener('click', (e) => {
    const nextBtn = e.target.closest('.carousel-next');
    const prevBtn = e.target.closest('.carousel-prev');
    if (!nextBtn && !prevBtn) return;

    const wrap = (nextBtn || prevBtn).closest('.button-container-wrap');
    if (!wrap) return;
    const container = wrap.querySelector('.button-container');
    if (!container) return;

    // compute current centered index
    const items = Array.from(container.querySelectorAll('.button-wrapper'));
    const center = container.scrollLeft + container.clientWidth / 2;
    let best = 0, bestDist = Infinity;
    items.forEach((it, i) => {
      const itCenter = it.offsetLeft + it.offsetWidth / 2;
      const d = Math.abs(itCenter - center);
      if (d < bestDist) { bestDist = d; best = i; }
    });

    const target = nextBtn ? best + 1 : best - 1;
    scrollContainerToIndex(container, target);
  });
});