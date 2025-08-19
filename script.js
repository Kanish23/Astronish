
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

//For the scrolling mechanism
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.button-container').forEach(container => {
    let isDown = false, startX = 0, scrollLeft = 0;

    container.addEventListener('mousedown', e => {
      isDown = true;
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
      container.classList.add('dragging');
      e.preventDefault();
    });

    container.addEventListener('mouseleave', () => { isDown = false; container.classList.remove('dragging'); });
    container.addEventListener('mouseup', () => { isDown = false; container.classList.remove('dragging'); });

    container.addEventListener('mousemove', e => {
      if (!isDown) return;
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5;
      container.scrollLeft = scrollLeft - walk;
    });

    // touch support
    let touchStartX = 0;
    container.addEventListener('touchstart', e => {
      touchStartX = e.touches[0].pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    }, { passive: true });

    container.addEventListener('touchmove', e => {
      const x = e.touches[0].pageX - container.offsetLeft;
      const walk = (x - touchStartX) * 1.5;
      container.scrollLeft = scrollLeft - walk;
    }, { passive: true });
  });

  console.log('drag-to-scroll initialized');
});
