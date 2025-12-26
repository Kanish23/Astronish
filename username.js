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

      const fileInput = document.getElementById('profile-pic');
      const file = fileInput?.files?.[0];
      let photoURL = user.photoURL;

      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      try {
        // Upload image if selected
        if (file) {
          const storageRef = firebase.storage().ref();
          const fileRef = storageRef.child(`users/${user.uid}/profile_${Date.now()}`);
          await fileRef.put(file);
          photoURL = await fileRef.getDownloadURL();
        }

        await user.updateProfile({
          displayName: name,
          photoURL: photoURL
        });

        if (typeof safeNavigate === 'function') safeNavigate('home'); else window.location.href = 'index.html';
      } catch (err) {
        console.error(err);
        alert(err.message || 'Failed to update profile');
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