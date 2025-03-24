import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";

document.getElementById("signup-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const errorText = document.getElementById("signup-error");

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("User signed up:", userCredential.user);
            alert("Signup successful!");
            window.location.href = "dashboard.html"; // Redirect after signup
        })
        .catch((error) => {
            errorText.innerText = error.message; // Show error message
        });
});
