
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "../../config/firebase.js";

// Inicializa la app solo una vez
const app = initializeApp(firebaseConfig);

// Exporta instancias únicas
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

// Función de login con Google
export async function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const token = await result.user.getIdToken();
    console.log("Token de Google:", token);
    return token;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
}

// Función de logout

