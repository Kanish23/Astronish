import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { auth } from "./firebase.js"; // Import the auth instance from firebase.js

document.getElementById("signup-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const message = document.getElementById("signup-message");

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            message.textContent = "Signup successful! You can now log in.";
            message.style.color = "green";
        })
        .catch((error) => {
            message.textContent = error.message;
            message.style.color = "red";
        });
});
