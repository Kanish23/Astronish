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


// Login Function
document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault(); 

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

     firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            
            window.location.href = "index.html"; 
        })
        .catch((error) => {
         
            const errorCode = error.code;
            const errorMessage = error.message;

        
            if (errorCode === 'auth/user-not-found') {
                alert("User not found. Please check your email.");
            } else if (errorCode === 'auth/wrong-password') {
                alert("Incorrect password. Please try again.");
            } else {
                alert(errorMessage); 
            }
        });
});

