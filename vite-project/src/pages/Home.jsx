
import { useEffect, useState } from "react";
import { Category } from "../components/Categoria";
import { NavBar } from "../components/NavBar";
import { Cards } from "../components/Card";
import "../styles/homeProducts.css"; 
function Home() {

    const [productos, setProductos] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
    
    const nombre = localStorage.getItem("nombre") || "";
    const email = localStorage.getItem("email") || "";
    setUser({ nombre, email });

    fetch("https://apirestphp.onrender.com/productos/")
        .then((res) => res.json())
        .then((data) => {
        setProductos(data);
        })
        .catch((error) => console.error("Error fetching products:", error));
    }, []);

  
  return (
    <>
      <NavBar email={user?.email} nombre={user?.nombre} />
      <h2 className="products-title">Productos</h2>
      <div className="products-container">
        {productos.map((p) => (
          <Cards key={p.id} productId={p.id} title={p.nombre} text={`$${p.precio}`} imgSrc={p.image}  stock={p.cantidad} price={p.precio} />
        ))}
      </div>
    </>
  );
}

export {Home};