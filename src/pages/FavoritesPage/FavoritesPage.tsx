import { useContext } from 'react';
import { ProductsCatalog } from '../../components/ProductsCatalog';
import { FavoritesContext } from '../../context';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useContext(FavoritesContext);

  return (
    <main className="favorites">
      {favorites.length > 0 ? (
        <ProductsCatalog products={favorites} title="Favorites" />
      ) : (
        <h1 className="favorites__empty">Favorites is empty</h1>
      )}
    </main>
  );
};
