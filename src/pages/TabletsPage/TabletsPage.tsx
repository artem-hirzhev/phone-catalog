import { useEffect, useState } from 'react';
import { getProductsByCategory } from '../../api/api';
import { Loader } from '../../components/Loader';
import { LoadError } from '../../components/LoadError';
import { NoResults } from '../../components/NoResults';
import { ProductsCatalog } from '../../components/ProductsCatalog';
import { Product } from '../../types';

export const TabletsPage: React.FC = () => {
  const [tablets, setTablets] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [wasLoaded, setWasLoaded] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getProductsByCategory('tablets')
      .then(setTablets)
      .catch(() => setError(true))
      .finally(() => {
        setIsLoading(false);
        setWasLoaded(true);
      });
  }, []);

  return (
    <main className="tablets">
      {isLoading && <Loader />}

      {(!isLoading && !error && tablets.length > 0) && (
        <ProductsCatalog products={tablets} title="Tablets" />
      )}

      {(!tablets.length && wasLoaded && !error) && (
        <NoResults />
      )}

      {(!isLoading && error) && <LoadError />}
    </main>
  );
};
