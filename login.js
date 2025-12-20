document.addEventListener('DOMContentLoaded', () => {
  if (!window.firebase) return;

  const form = document.getElementById('login-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email')?.value?.trim();
      const password = document.getElementById('password')?.value;
      if (!email || !password) return alert('Please enter email and password');

      try {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        if (user && user.emailVerified === false) {
          alert('Please verify your email before logging in.');
          await firebase.auth().signOut();
          return;
        }
        if (typeof safeNavigate === 'function') safeNavigate('home'); else window.location.href = 'index.html';
      } catch (err) {
        console.error(err);
        if (err.code === 'auth/user-not-found') alert('User not found.');
        else if (err.code === 'auth/wrong-password') alert('Incorrect password.');
        else alert(err.message || 'Login failed');
      }
    });
  }

  const forgot = document.getElementById('forgotPassword');
  if (forgot) {
    forgot.addEventListener('click', async () => {
      const email = prompt('Enter your email to reset your password:');
      if (!email) return;
      try {
        await firebase.auth().sendPasswordResetEmail(email);
        alert('Password reset email sent!');
      } catch (err) {
        console.error(err);
        alert(err.message || 'Failed to send reset email');
      }
    });
  }
});

/* Old
document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            // ✅ Email verification check
            if (!user.emailVerified) {
                alert("Please verify your email before logging in.");
                firebase.auth().signOut();
                return;
            }

            // Redirect if verified
            window.location.href = "index.html";
        })
        .catch((error) => {
            const errorCode = error.code;

            if (errorCode === 'auth/user-not-found') {
                alert("User not found. Please check your email.");
            } else if (errorCode === 'auth/wrong-password') {
                alert("Incorrect password. Please try again.");
            } else {
                alert(error.message);
            }
        });
});

// Forgot Password
document.getElementById("forgotPassword").addEventListener("click", function () {
    const email = prompt("Enter your email to reset your password:");
    if (!email) return;

    firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            alert("Password reset email sent!");
        })
        .catch((error) => {
            alert(error.message);
        });
}); */



