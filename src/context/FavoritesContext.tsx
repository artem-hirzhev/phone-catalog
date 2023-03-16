import React, { Dispatch, SetStateAction, useState } from 'react';
import { Product } from '../types';

type FavoritesContextType = {
  favorites: Product[];
  setFavorites: Dispatch<SetStateAction<Product[]>>;
};

export const FavoritesContext = React.createContext<FavoritesContextType>(
  {
    favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
    setFavorites: () => {},
  },
);

type Props = {
  children: React.ReactNode;
};

export const FavoritesProvider: React.FC<Props> = ({ children }) => {
  const [favorites, setFavorites] = useState<Product[]>(
    JSON.parse(localStorage.getItem('favorites') || '[]'),
  );

  return (
    <FavoritesContext.Provider value={{ favorites, setFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};
