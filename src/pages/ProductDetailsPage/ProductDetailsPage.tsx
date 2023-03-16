import React, { useEffect, useState } from 'react';
import {
  Link, NavLink, useLocation, useParams,
} from 'react-router-dom';
import { getProductDetails, getProducts } from '../../api/api';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ButtonFavorite } from '../../components/ButtonFavorite';
import { ButtonPrimary } from '../../components/ButtonPrimary';
import { Loader } from '../../components/Loader';
import { LoadError } from '../../components/LoadError';
import { ProductsSlider } from '../../components/ProductsSlider';
import { ProductColors, productColors } from '../../constants';
import { Product, ProductDetails } from '../../types';
import { ReactComponent as ArrowLeft } from '../../assets/svg/arrowLeft.svg';

export const ProductDetailsPage: React.FC = () => {
  const [details, setDetails] = useState<ProductDetails | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const { productId } = useParams();
  const { pathname } = useLocation();
  const category = pathname.split('/')[1];
  const product = products.find(item => item.itemId === details?.id);
  const dataIsLoaded = !error && details && products.length > 0;

  useEffect(() => {
    setIsLoading(true);

    getProductDetails(productId as string)
      .then(setDetails)
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, [productId]);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <main className="details">
      {isLoading && <Loader />}

      {(!isLoading && dataIsLoaded) && (
        <>
          <Breadcrumbs productName={details.name} />

          <Link className="details__back" to="/phones">
            <ArrowLeft />
            Back
          </Link>

          <h1 className="details__product-name">{details.name}</h1>

          <section className="details__content">
            <article className="details__images">
              <div className="details__small-images-container">
                {details.images.map(image => (
                  <button
                    type="button"
                    key={image}
                    className="details__image-small"
                    onClick={() => setCurrentImage(image)}
                  >
                    <img src={image} alt="product-small" />
                  </button>
                ))}
              </div>

              <div className="details__image-big">
                {!currentImage ? (
                  <img src={details.images[0]} alt="product-big" />
                ) : (
                  <img src={currentImage} alt="product-big" />
                )}
              </div>
            </article>

            <article className="details__info">
              <div className="details__colors">
                <div className="details__info-name">
                  Available colors
                </div>

                <div className="details__info-container">
                  {details.colorsAvailable.map(color => (
                    <NavLink
                      className={
                        ({ isActive }) => `details__color ${isActive ? 'details__color--active' : ''}`
                      }
                      key={color}
                      to={`/${category}/${details.namespaceId}-${details.capacity.toLowerCase()}-${color}`}
                      // eslint-disable-next-line max-len
                      style={{ backgroundColor: productColors[color as keyof ProductColors] }}
                    />
                  ))}
                </div>
              </div>

              <div className="details__capacity">
                <div className="details__info-name">
                  Select capacity
                </div>

                <div className="details__info-container">
                  {details.capacityAvailable.map(capacity => (
                    <NavLink
                      className={
                        ({ isActive }) => `details__memory-size ${isActive ? 'details__memory-size--active' : ''}`
                      }
                      key={capacity}
                      to={`/${category}/${details.namespaceId}-${capacity.toLowerCase()}-${details.color}`}
                    >
                      {capacity}
                    </NavLink>
                  ))}
                </div>
              </div>

              <div className="details__price">
                <div className="details__discount">
                  {`$${details.priceDiscount}`}
                </div>

                <div className="details__regular">
                  {`$${details.priceRegular}`}
                </div>
              </div>

              <div className="details__buttons">
                {product ? (
                  <>
                    <ButtonPrimary
                      product={product}
                    />
                    <ButtonFavorite
                      product={product}
                    />
                  </>
                ) : (
                  <h3>{'Product isn\'t available'}</h3>
                )}
              </div>

              <div className="details__short-specs">
                <p className="details__specs-group">
                  <span>Screen</span>

                  <span>{details.screen}</span>
                </p>

                <p className="details__specs-group">
                  <span>Resolution</span>

                  <span>{details.resolution}</span>
                </p>

                <p className="details__specs-group">
                  <span>Processor</span>

                  <span>{details.processor}</span>
                </p>

                <p className="details__specs-group">
                  <span>RAM</span>

                  <span>{details.ram}</span>
                </p>
              </div>
            </article>

            <article className="details__about">
              <h2 className="details__title">About</h2>

              {details.description.map(item => (
                <React.Fragment key={item.title}>
                  <h3 className="details__subtitle">{item.title}</h3>

                  <p className="details__text">{item.text}</p>
                </React.Fragment>
              ))}
            </article>

            <article className="details__full-specs">
              <h2 className="details__title">Tech specs</h2>

              <p className="details__specs-group">
                <span>Screen</span>

                <span>{details.screen}</span>
              </p>

              <p className="details__specs-group">
                <span>Resolution</span>

                <span>{details.resolution}</span>
              </p>

              <p className="details__specs-group">
                <span>Processor</span>

                <span>{details.processor}</span>
              </p>

              <p className="details__specs-group">
                <span>RAM</span>

                <span>{details.ram}</span>
              </p>

              <p className="details__specs-group">
                <span>Built in memory</span>

                <span>{details.capacity}</span>
              </p>

              <p className="details__specs-group">
                <span>Camera</span>

                <span>{details.camera}</span>
              </p>

              <p className="details__specs-group">
                <span>Zoom</span>

                <span>{details.zoom}</span>
              </p>

              <p className="details__specs-group">
                <span>Cell</span>

                <span>
                  {details.cell.slice(0, 4).join(',')}
                  <br />
                  {details.cell.slice(4).join(',')}
                </span>
              </p>

            </article>
          </section>

          <section className="details__additional">
            <ProductsSlider products={products} title="You may also like" />
          </section>
        </>
      )}

      {(!isLoading && error) && (
        <LoadError />
      )}
    </main>
  );
};
