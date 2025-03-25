import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";

// Login Function
document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent page reload

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            alert("Login successful! Redirecting...");
            window.location.href = "index.html"; // Redirect to home page
        })
        .catch((error) => {
            if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
                alert("Error: Invalid email or password.");
            } else {
                alert("Error: " + error.message);
            }
        });
});

