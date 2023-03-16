import { useEffect, useState } from 'react';
import { getBrandNewProducts, getHotPriceProducts } from '../../api/api';
import { BannerSlider } from '../../components/BannerSlider';
import { CategoryCard } from '../../components/CategoryCard';
import { Loader } from '../../components/Loader';
import { LoadError } from '../../components/LoadError';
import { ProductsSlider } from '../../components/ProductsSlider';
import { banners, categories } from '../../constants';
import { Product } from '../../types';

export const HomePage: React.FC = () => {
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [discountedProducts, setDiscountedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    Promise.all([getBrandNewProducts(), getHotPriceProducts()])
      .then(result => {
        setNewProducts(result[0]);
        setDiscountedProducts(result[1]);
      })
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <main className="home">
      {isLoading && <Loader />}

      {(!isLoading && !error) && (
        <>
          <section className="home__banner">
            <BannerSlider banners={banners} />
          </section>

          <section className="home__hot">
            <ProductsSlider products={discountedProducts} title="Hot prices" />
          </section>

          <section className="home__categories">
            <h2 className="home__title">Shop by categories</h2>

            <div className="home__category-cards">
              {categories.map(category => (
                <CategoryCard
                  key={category.id}
                  category={category}
                />
              ))}
            </div>
          </section>

          <section className="home__new">
            <ProductsSlider products={newProducts} title="Brand new models" />
          </section>
        </>
      )}

      {(!isLoading && error) && <LoadError />}
    </main>
  );
};
