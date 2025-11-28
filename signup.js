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

// Sign Up Function
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
            window.location.href = "index.html";
        })
        .catch((error) => {
            if (error.code === "auth/email-already-in-use") {
                alert("Error: This email is already in use. Try logging in.");
            } else {
                alert("Error: " + error.message);
            }
        });
});


