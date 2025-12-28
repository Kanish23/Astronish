document.addEventListener('DOMContentLoaded', () => {
  if (!window.firebase) return;

  firebase.auth().onAuthStateChanged(user => {
    if (!user) {
      if (typeof safeNavigate === 'function') safeNavigate('login'); else window.location.href = 'login.html';
      return;
    }

    const input = document.getElementById('username');
    const form = document.getElementById('username-form');
    if (input && user.displayName) input.value = user.displayName;
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = input?.value?.trim();
      if (!name) return alert('Please enter a username');

      const urlInput = document.getElementById('profile-pic-url');
      // If URL is provided, use it. Otherwise keep existing.
      const newPhotoURL = urlInput?.value?.trim() || user.photoURL;

      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      try {
        await user.updateProfile({
          displayName: name,
          photoURL: newPhotoURL
        });

        if (typeof safeNavigate === 'function') safeNavigate('home'); else window.location.href = 'index.html';
      } catch (err) {
        console.error(err);
        alert('Error: ' + (err.message || 'Failed to update profile'));
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  });
});

/*
firebase.auth().onAuthStateChanged(user => {
  if (!user) {
    // not signed in — redirect to login
    window.location.href = 'login.html';
    return;
  }

  // optionally prefill username field with existing displayName
  const input = document.getElementById('username');
  if (user.displayName) input.value = user.displayName;

  const form = document.getElementById('username-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = input.value.trim();
    if (!name) return alert('Please enter a username');

    try {
      await user.updateProfile({ displayName: name });
      // success — redirect to main page
      window.location.href = 'index.html';
    } catch (err) {
      console.error(err);
      alert(err.message || 'Failed to set username');
    }
  });
}); */