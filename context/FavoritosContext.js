import React, { createContext, useContext, useState } from 'react';

const FavoritosContext = createContext();

export const FavoritosProvider = ({ children }) => {
  const [favoritos, setFavoritos] = useState([]);

  const addFavorito = (jogador) => {
    setFavoritos((prevFavoritos) => [...prevFavoritos, jogador]);
  };

  const removeFavorito = (id) => {
    setFavoritos((prevFavoritos) => prevFavoritos.filter(jogador => jogador.id !== id));
  };

  return (
    <FavoritosContext.Provider value={{ favoritos, addFavorito, removeFavorito }}>
      {children}
    </FavoritosContext.Provider>
  );
};

export const useFavoritos = () => useContext(FavoritosContext);
