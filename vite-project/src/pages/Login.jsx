import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginWithGoogle } from "../services/auth";
import "../styles/login.css"; // Importamos los estilos

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setError(null);
    try {
      const token = await loginWithGoogle(); // este token es el idToken de Firebase

      // 🔒 Validar token en tu backend PHP
      console.log("Token enviado:", token);
      const response = await fetch("https://apirestphp.onrender.com/loginGoogle", {
      // const response = await fetch("http://localhost/PruebaTecnica/backendphp/routes/loginGoogle.php", {
          // const response = await fetch("http://localhost/PruebaTecnica/backendphp/config/firebase.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,  // importante el "Bearer "
        },
       body: JSON.stringify({ idToken: token })
      });

      // const data = await response.json();
      // console.log("Respuesta del backend:", data);
      // if (data.success) {
      //   // Guardamos el token y navegamos
      //   localStorage.setItem("token", token);
      //   localStorage.setItem("nombre", data.nombre);
      //   localStorage.setItem("email", data.email);
      //   navigate("/home");
      // } else {
      //   setError("Token inválido. Acceso denegado.");
      // }
      const text = await response.text();
      let data;

      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error("Respuesta no es JSON:", text + e);
        setError("Error inesperado del servidor.");
        return;
      }

      console.log("Respuesta del backend:", data);
      if (data.success) {
        localStorage.setItem("token", token);
        localStorage.setItem("nombre", data.nombre);
        localStorage.setItem("email", data.email);
        navigate("/home");
      } else {
        setError(data.error || "Token inválido. Acceso denegado.");
      }

    } catch (err) {
      console.error(err);
      setError("Error al iniciar sesión con Google.");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      // Simulación de login
      localStorage.setItem("token", "token_falso");
      navigate("/home");
    } catch {
      setError("Credenciales inválidas.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>Mini E-Commerce</h2>
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleFormSubmit}>
          <label>Correo electrónico:</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="correo@ejemplo.com"
          />
          <label>Contraseña:</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
          />
          <button type="submit" className="login-btn">Iniciar sesión</button>
          
        </form>
        <button id="register" className="login-btn" onClick={() => navigate("/register")} style={{ marginTop: '10px' }}>Registrate</button>
        <div className="divider">o</div>

       
        <button id="googleLogin" className="google-btn" onClick={handleGoogleLogin}>
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google Logo"/>
                <span>Google</span>
              </button>
      </div>
    </div>
  );
}

export {Login};
