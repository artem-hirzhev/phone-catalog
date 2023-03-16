import classNames from 'classnames';
import { useContext } from 'react';
import { FavoritesContext } from '../../context/FavoritesContext';
import { Product } from '../../types';
import { ReactComponent as FavoriteIcon } from '../../assets/svg/favorites.svg';
import {
  ReactComponent as FavoriteIconRed,
} from '../../assets/svg/favoriteRed.svg';

type Props = {
  product: Product;
};

export const ButtonFavorite: React.FC<Props> = ({ product }) => {
  const { favorites, setFavorites } = useContext(FavoritesContext);
  const isFavorite = favorites.find(
    favorite => favorite.itemId === product.itemId,
  );

  const manageFavorites = () => {
    if (isFavorite) {
      const filtered = favorites.filter(
        favorite => favorite.itemId !== product.itemId,
      );

      localStorage.setItem('favorites', JSON.stringify(filtered));
      setFavorites(filtered);

      return;
    }

    localStorage.setItem('favorites', JSON.stringify([...favorites, product]));
    setFavorites([...favorites, product]);
  };

  return (
    <button
      className={classNames(
        'button-favorite',
        { 'button-favorite--selected': isFavorite },
      )}
      type="button"
      onClick={manageFavorites}
      data-cy="addToFavorite"
    >
      {isFavorite ? (
        <FavoriteIconRed />
      ) : (
        <FavoriteIcon />
      )}
    </button>
  );
};
