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
      alert('Submit handler triggered!'); // DEBUG: Confirm event fires

      const name = input?.value?.trim();
      if (!name) return alert('Please enter a username');

      const fileInput = document.getElementById('profile-pic');
      const file = fileInput?.files?.[0];
      alert(`File selected: ${file ? file.name : 'None'}`); // DEBUG: Confirm file selection

      let photoURL = user.photoURL;

      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      try {
        // Upload image if selected
        if (file) {
          if (!firebase.storage) throw new Error('Firebase Storage SDK not loaded');
          alert('Starting upload... (Debug)');
          const storageRef = firebase.storage().ref();
          const fileRef = storageRef.child(`users/${user.uid}/profile_${Date.now()}`);

          const uploadTask = fileRef.put(file);

          // await the upload task with progress monitoring
          await new Promise((resolve, reject) => {
            uploadTask.on('state_changed',
              (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
              },
              (error) => {
                reject(error);
              },
              () => {
                resolve();
              }
            );
          });

          alert('Upload successful. Getting URL... (Debug)');
          photoURL = await fileRef.getDownloadURL();
        }

        await user.updateProfile({
          displayName: name,
          photoURL: photoURL
        });

        if (typeof safeNavigate === 'function') safeNavigate('home'); else window.location.href = 'index.html';
      } catch (err) {
        console.error(err);
        alert('Error: ' + (err.message || 'Unknown error'));
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