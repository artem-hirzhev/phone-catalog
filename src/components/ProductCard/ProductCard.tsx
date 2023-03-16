import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { ButtonFavorite } from '../ButtonFavorite';
import { ButtonPrimary } from '../ButtonPrimary';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className="product">
      <Link className="product__image" to={`/${product.category}/${product.itemId}`}>
        <img
          src={product.image}
          alt="product"
        />
      </Link>

      <Link className="product__title" to={`/${product.category}/${product.itemId}`}>
        {product.name}
      </Link>

      <div className="product__price">
        <div className="product__discount">
          $
          {product.price}
        </div>

        <div className="product__full">
          $
          {product.fullPrice}

        </div>
      </div>

      <div className="product__specs">
        <div className="product__spec-name">Screen</div>

        <div className="product__spec-value">{product.screen}</div>
      </div>

      <div className="product__specs">
        <div className="product__spec-name">Capasity</div>

        <div className="product__spec-value">{product.capacity}</div>
      </div>

      <div className="product__specs">
        <div className="product__spec-name">RAM</div>

        <div className="product__spec-value">{product.ram}</div>
      </div>

      <div className="product__buttons">
        <ButtonPrimary product={product} />

        <ButtonFavorite product={product} />
      </div>
    </div>
  );
};
