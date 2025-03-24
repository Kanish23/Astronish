import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";

document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    const errorText = document.getElementById("login-error");

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("User logged in:", userCredential.user);
            alert("Login successful!");
            window.location.href = "dashboard.html"; // Redirect after login
        })
        .catch((error) => {
            errorText.innerText = error.message; // Show error message
        });
});
