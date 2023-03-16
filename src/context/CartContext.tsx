import React, { Dispatch, SetStateAction, useState } from 'react';
import { CartItem } from '../types/CartItem';

type CartContextType = {
  cartItems: CartItem[];
  setCartItems: Dispatch<SetStateAction<CartItem[]>>;
};

export const CartContext = React.createContext<CartContextType>(
  {
    cartItems: JSON.parse(localStorage.getItem('cartItems') || '[]'),
    setCartItems: () => { },
  },
);

type Props = {
  children: React.ReactNode;
};

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(
    JSON.parse(localStorage.getItem('cartItems') || '[]'),
  );

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};
