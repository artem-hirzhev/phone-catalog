/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useContext } from 'react';
import { CartContext } from '../../context';
import { Product } from '../../types';

type Props = {
  product: Product;
};

export const ButtonPrimary: React.FC<Props> = ({ product }) => {
  const { cartItems, setCartItems } = useContext(CartContext);

  const isInCart = cartItems.find(
    item => item.product.itemId === product.itemId,
  );

  const manageCart = () => {
    if (isInCart) {
      const filtered = cartItems.filter(
        item => item.product.itemId !== product.itemId,
      );

      localStorage.setItem('cartItems', JSON.stringify(filtered));
      setCartItems(filtered);

      return;
    }

    const newItem = { id: product.id, quantity: 1, product };

    localStorage.setItem('cartItems', JSON.stringify([...cartItems, newItem]));
    setCartItems([...cartItems, newItem]);
  };

  return (
    <button
      className={classNames(
        'button-primary',
        { 'button-primary--selected': isInCart },
      )}
      type="button"
      onClick={manageCart}
    >
      {isInCart ? ('Added to cart') : ('Add to cart')}
    </button>
  );
};
