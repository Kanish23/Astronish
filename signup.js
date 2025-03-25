import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";

// Sign Up Function
document.getElementById("signup-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent page reload

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Sign-up successful! Redirecting...");
            window.location.href = "index.html"; // Redirect to home page
        })
        .catch((error) => {
            if (error.code === "auth/email-already-in-use") {
                alert("Error: This email is already in use. Try logging in.");
            } else {
                alert("Error: " + error.message);
            }
        });
});

