import { Product } from '../types';

export const sortProducts = (products: Product[], sort: string) => {
  switch (sort) {
    case 'name':
      return [...products].sort((a, b) => a.name.localeCompare(b.name));

    case 'price':
      return [...products].sort((a, b) => a.price - b.price);

    default:
      return [...products].sort((a, b) => b.year - a.year);
  }
};
