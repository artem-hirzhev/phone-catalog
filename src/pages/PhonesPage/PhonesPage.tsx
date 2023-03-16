import { useEffect, useState } from 'react';
import { getProductsByCategory } from '../../api/api';
import { Loader } from '../../components/Loader';
import { LoadError } from '../../components/LoadError';
import { NoResults } from '../../components/NoResults';
import { ProductsCatalog } from '../../components/ProductsCatalog';
import { Product } from '../../types';

export const PhonesPage: React.FC = () => {
  const [phones, setPhones] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [wasLoaded, setWasLoaded] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getProductsByCategory('phones')
      .then(setPhones)
      .catch(() => setError(true))
      .finally(() => {
        setIsLoading(false);
        setWasLoaded(true);
      });
  }, []);

  return (
    <main className="phones" data-cy="productList">
      {isLoading && <Loader />}

      {(!isLoading && !error && phones.length > 0) && (
        <ProductsCatalog products={phones} title="Mobile phones" />
      )}

      {(!phones.length && wasLoaded && !error) && (
        <NoResults />
      )}

      {(!isLoading && error) && <LoadError />}
    </main>
  );
};
