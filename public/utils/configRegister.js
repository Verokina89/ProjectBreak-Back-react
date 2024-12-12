// Importa las funciones necesarias desde Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

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

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Instancia de autenticación

// Define la función register como una arrow function
const register = async () => {
  const messageDiv = document.getElementById('message'); // Div para mostrar errores
  messageDiv.textContent = ''; // Limpia mensajes anteriores
  try {
    // Obtiene valores de email y password
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Valida la entrada
    if (!email || !password) {
      messageDiv.textContent = 'Email and password are required';
      return;
    }

    // Crea un nuevo usuario con Firebase
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    //manejar el .then (promesa)

    // Obtiene el ID token del usuario registrado
    const idToken = await userCredential.user.getIdToken();

    // Envía el ID token al servidor
    const response = await fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken }),
    });

    const data = await response.json();

    // Redirige al dashboard si el registro es exitoso
    if (data.success) {
      window.location.href = '/dashboard';
    } else {
      messageDiv.textContent = 'Registration failed: ' + data.error;
    }

  } catch (err) {
    messageDiv.textContent = 'Error during registration: ' + err.message;
  }
};

// Event listener para el botón de registro
document.getElementById('registerButton').addEventListener('click', register);