import { useState } from 'react';
import { Product } from '../../types';
import { ButtonSecondary } from '../ButtonSecondary';
import { ProductCard } from '../ProductCard';
import { ReactComponent as ArrowLeft } from '../../assets/svg/arrowLeft.svg';
import { ReactComponent as ArrowRight } from '../../assets/svg/arrowRight.svg';

type Props = {
  products: Product[];
  title: string;
};

export const ProductsSlider: React.FC<Props> = ({ products, title }) => {
  const [offset, setOffset] = useState(0);

  const pressNext = () => {
    if (offset === -300) {
      setOffset(0);

      return;
    }

    setOffset(prev => prev - 100);
  };

  const pressPrev = () => {
    if (offset === 0) {
      setOffset(-300);

      return;
    }

    setOffset(prev => prev + 100);
  };

  return (
    <div className="slider">
      <div className="slider__header">
        <h2 className="slider__title">{title}</h2>

        <div className="slider__buttons">
          <ButtonSecondary
            handler={pressPrev}
            width="32px"
            height="32px"
          >
            <ArrowLeft />
          </ButtonSecondary>

          <ButtonSecondary
            handler={pressNext}
            width="32px"
            height="32px"
          >
            <ArrowRight />
          </ButtonSecondary>
        </div>
      </div>

      <div
        className="slider__container"
        style={{ transform: `translate(${offset}%)` }}
      >
        {products.map(product => (
          <div className="slider__item" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};
