const getDataApi = async () => {
    try {
        // URL de mi API en PHP
        const response = await fetch('http://localhost/PruebaTecnica/backendphp/routes/product.php');
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        return data; // Retorna los datos recibidos de tu API en PHP
        
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export { getDataApi };
