import { useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { CartContext, FavoritesContext } from '../../context';
import { Logo } from '../Logo';
import { NavList } from '../NavList';
import { Search } from '../Search';
import favoritesIcon from '../../assets/svg/favorites.svg';
import cartIcon from '../../assets/svg/cart.svg';

export const Header: React.FC = () => {
  const links = [
    { id: 1, path: '/', text: 'HOME' },
    { id: 2, path: 'phones', text: 'PHONES' },
    { id: 3, path: 'tablets', text: 'TABLETS' },
    { id: 4, path: 'accessories', text: 'ACCESSORIES' },
  ];

  const { pathname } = useLocation();
  const searchIsVisible
    = ['/phones', '/tablets', '/accessories', '/favorites'].includes(pathname);

  const { cartItems } = useContext(CartContext);
  const { favorites } = useContext(FavoritesContext);

  return (
    <header className="header" id="header">
      <div className="header__left">
        <div className="header__logo">
          <Logo />
        </div>

        <nav className="header__nav">
          <NavList links={links} />
        </nav>
      </div>

      <div className="header__right">
        {searchIsVisible && (
          <div className="header__search">
            <Search />
          </div>
        )}

        <NavLink
          to="favorites"
          className={({ isActive }) => (
            isActive
              ? 'header__favorites header__favorites--active'
              : 'header__favorites'
          )}
        >
          <img
            className="header__icon header__icon--favorites"
            src={favoritesIcon}
            alt="favorite"
          />

          {favorites.length > 0 && (
            <div className="header__dot">
              {favorites.length}
            </div>
          )}
        </NavLink>

        <NavLink
          to="cart"
          className={({ isActive }) => (
            isActive
              ? 'header__cart header__cart--active'
              : 'header__cart'
          )}
        >
          <img
            className="header__icon header__icon--cart"
            src={cartIcon}
            alt="cart"
          />

          {cartItems.length > 0 && (
            <div className="header__dot">
              {cartItems.length}
            </div>
          )}
        </NavLink>
      </div>
    </header>
  );
};
