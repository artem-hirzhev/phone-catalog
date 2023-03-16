import { useEffect, useState } from 'react';
import { getProductsByCategory } from '../../api/api';
import { Loader } from '../../components/Loader';
import { LoadError } from '../../components/LoadError';
import { NoResults } from '../../components/NoResults';
import { ProductsCatalog } from '../../components/ProductsCatalog';
import { Product } from '../../types';

export const AccessoriesPage: React.FC = () => {
  const [accessories, setAccessories] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [wasLoaded, setWasLoaded] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getProductsByCategory('accessories')
      .then(setAccessories)
      .catch(() => setError(true))
      .finally(() => {
        setIsLoading(false);
        setWasLoaded(true);
      });
  }, []);

  return (
    <main className="accessories">
      {isLoading && <Loader />}

      {(!isLoading && !error && accessories.length > 0) && (
        <ProductsCatalog products={accessories} title="Accessories" />
      )}

      {(!accessories.length && wasLoaded && !error) && (
        <NoResults />
      )}

      {(!isLoading && error) && <LoadError />}
    </main>
  );
};
