import { Product } from '../types';

const BASE_URL = 'https://raw.githubusercontent.com/artem-hirzhev/phone-catalog/gh-pages/api';

export const getProducts = () => {
  return fetch(`${BASE_URL}/products.json`)
    .then(response => response.json());
};

type Category = 'phones' | 'tablets' | 'accessories';

export const getProductsByCategory = (category: Category) => {
  return getProducts()
    .then(products => products.filter(
      (product: Product) => product.category === category,
    ));
};

export const getProductDetails = (productId: string) => {
  return fetch(`${BASE_URL}/products/${productId}.json`)
    .then(response => response.json());
};

export const getHotPriceProducts = () => {
  return getProducts()
    .then((products: Product[]) => products.sort(
      (a, b) => (b.fullPrice - b.price) - (a.fullPrice - a.price),
    ).slice(0, 16));
};

export const getBrandNewProducts = () => {
  return getProducts()
    .then((products: Product[]) => products.sort(
      (a, b) => (b.year - a.year),
    ).slice(0, 16));
};
