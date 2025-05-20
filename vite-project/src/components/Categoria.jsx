import { Flex, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import '../styles/categoria.css'; // Importamos los estilos
export const Category = () => {
  const navigate = useNavigate();

  const handleProducts = (category) => {
    navigate(`/category/${category}`);
  };

  return (
    <Flex
      className="category-container"
      mih={50}
      gap="xl"
      justify="space-evenly"
      align="center"
      direction="row"
      wrap="wrap"
    >
      <Button
        className="category-button"
        name='btn-videogames'
        onClick={() => handleProducts('Ropa de Hombre')}
      >
        Ropa de Hombre
      </Button>
       <Button
        className="category-button"
        name='btn-accessories'
        onClick={() => handleProducts('Ropa de Mujer')}
      >
        Ropa de Mujer
      </Button>
      <Button
        className="category-button"
        name='btn-electronics'
        onClick={() => handleProducts('Joyas')}
      >
        Joyas
      </Button>
      <Button
        className="category-button"
        name='btn-computers'
        onClick={() => handleProducts('Electronicos')}
      >
        Electronicos
      </Button>

    </Flex>
  );
};