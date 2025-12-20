document.addEventListener('DOMContentLoaded', () => {
  if (!window.firebase) return;

  const form = document.getElementById('signup-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email')?.value?.trim();
    const password = document.getElementById('password')?.value;
    if (!email || !password) return alert('Please enter email and password');

    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      if (user && user.sendEmailVerification) user.sendEmailVerification().catch(() => {});
      if (typeof safeNavigate === 'function') safeNavigate('username'); else window.location.href = 'username.html';
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') alert('This email is already in use. Try logging in.');
      else alert(err.message || 'Sign up failed');
    }
  });
});

/* Old Code(backup)
document.getElementById("signup-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            // ⭐ ADD THIS: Send verification email
            user.sendEmailVerification()
                .then(() => {
                    alert("Verification email sent! Please check your inbox before logging in.");
                })
                .catch((error) => {
                    alert("Error sending verification email: " + error.message);
                });

            // Optional: redirect after sending email
            window.location.href = "username.html";
        })
        .catch((error) => {
            if (error.code === "auth/email-already-in-use") {
                alert("Error: This email is already in use. Try logging in.");
            } else {
                alert("Error: " + error.message);
            }
        });
}); */


