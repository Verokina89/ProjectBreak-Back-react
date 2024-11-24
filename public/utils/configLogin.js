// Importa las funciones necesarias desde Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";


// import { initializeApp } from "firebase/app";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC2O6-GCWX59UKxmXFKfkgitRXPdiWfwdc",
  authDomain: "backendshop-55d00.firebaseapp.com",
  projectId: "backendshop-55d00",
  storageBucket: "backendshop-55d00.appspot.com",
  messagingSenderId: "744553208820",
  appId: "1:744553208820:web:6dc97676a38e04013537a1",
  measurementId: "G-6CHTTHBSLJ"
};

// Initialize Firebase (para Firebase SDK 9.x o superior)
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app); // Instancia de autenticación

// Define la función login como una arrow function
const login = async () => {
  const messageDiv = document.getElementById('message'); //div para mostrar errores
  messageDiv.textContent = ''; //limpia msn anteriores
  try {
    //obtiene valores d mail y password
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    //valida la entrada
    if (!email || !password) {
      messageDiv.textContent = 'Email and password are required';
      return;
    }
    // Autentica al usuario con Firebase
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    //trbajar la promes

    // Obtiene IDtoken del usuario autenticado
    const idToken = await userCredential.user.getIdToken();
    // Envía el ID token al servidor
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken }),
    });
    const data = await response.json();
    // Redirige al dashboard si el login es exitoso
    if (data.success) {
      window.location.href = '/dashboard';
    } else {
      messageDiv.textContent = 'Login failed: ' + data.error;
    }
  }catch (err) {
    messageDiv.textContent = 'Error during login: ' + err.message;
  }
};

// Maneja evento del envío del formulario
const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();  // Prevenir comportamiento predeterminado
  login();  // Llamar a la funcion de login definida aqui arriba en este archvo configLogin.js
});




/*
Prueba con un ejemplo básico
Si sabr donde esta el problema, se prueba con este codigo simple que solo realiza la autenticación con Firebase sin el fetch al backend:

javascript
Copiar código
const login = async () => {
  try {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('Usuario autenticado:', userCredential.user);
  } catch (error) {
    console.error('Error en el login:', error.message);
  }
};


Esto solamnte hace autenticación con Firebase. Si funciona, entonce el problema esta en la parte donde ese enva el idToken al backend.


// const loginButton = document.getElementById("loginButton")

// loginButton.addEventListener("click", () => {
//   console.log("¡preciono el botoooooon!");
  
//     login()
// })
*/