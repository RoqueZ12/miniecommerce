import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import "../styles/login.css"; // Importamos los estilos

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

 const handleFormSubmit = async (e) => {
  e.preventDefault();
  setError(null);
  try {
    const response = await fetch("http://localhost/PruebaTecnica/backendphp/routes/register.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (data.success) {
      await Swal.fire({
        title: "¡Registro exitoso!",
        text: "Redirigiendo...",
        icon: "success",
        timer: 1000, // duración en milisegundos
        showConfirmButton: false, // oculta el botón
        allowOutsideClick: false,
        allowEscapeKey: false,
        didClose: () => {
          navigate("/home");
        },
      });
    } else {
      setError(data.message || "No se pudo registrar.");
    }
  } catch {
    setError("Error de conexión.");
  }
};


  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>Mini E-Commerce</h2>
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleFormSubmit}>
        <label>Nombre:</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre"
          />
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
           <button type="submit" className="login-btn" style={{ marginTop: '10px' }}>Registrarme</button>
        </form>
       
        <div className="divider">o</div>
        <p style={{ marginTop: '10px', textAlign: 'center' }}>Ya tienes cuenta? <span onClick={() => navigate("/")} style={{ color: 'blue', cursor: 'pointer' }}>Inicia sesión</span></p>
      </div>
    </div>
  );
}

export {Register};
