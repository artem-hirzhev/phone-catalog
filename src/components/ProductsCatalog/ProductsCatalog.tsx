import { useLocation, useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '../Breadcrumbs';
import { Dropdown } from '../Dropdown';
import { NoSearchResults } from '../NoSearchResults';
import { Pagination } from '../Pagination';
import { ProductCard } from '../ProductCard';
import { getButtonName, sortProducts } from '../../helpers';
import { Product, SearchParamsKey } from '../../types';

type Props = {
  products: Product[]
  title: string;
};

export const ProductsCatalog: React.FC<Props> = ({ products, title }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = searchParams.get('page') || '1';
  const perPage = searchParams.get('perPage') || '16';
  const sort = searchParams.get('sort') || 'age';
  const query = searchParams.get('query') || '';

  const maxEnd = Number(perPage) * Number(currentPage);
  const itemEnd = maxEnd > products.length ? products.length : maxEnd;
  const itemStart = maxEnd - Number(perPage);

  const dropdownPerPageItems = [
    { id: 1, name: '4', value: '4' },
    { id: 2, name: '8', value: '8' },
    { id: 3, name: '16', value: '16' },
    { id: 4, name: 'All', value: 'all' },
  ];

  const dropdownSortItems = [
    { id: 1, name: 'Newest', value: 'age' },
    { id: 2, name: 'Alphabetically', value: 'name' },
    { id: 3, name: 'Cheapest', value: 'price' },
  ];

  const sortButtonName = getButtonName(sort, dropdownSortItems);
  const perPageButtonName = getButtonName(perPage, dropdownPerPageItems);

  const updateSearchParams = (
    key: SearchParamsKey,
    value: string,
  ) => {
    searchParams.set(key, value);
    setSearchParams(searchParams);
  };

  const handleSortChange = (value: string) => {
    updateSearchParams('sort', value);
  };

  const handlePerPageChange = (value: string) => {
    updateSearchParams('perPage', value);
  };

  const handlePageChange = (number: number) => {
    updateSearchParams('page', String(number));
  };

  const searchResults = products.filter(
    product => product.name.toLowerCase().includes(query),
  );

  const { pathname } = useLocation();
  const filtersIsVisible = pathname !== '/favorites';

  return (
    <div className="products">
      {(query && searchResults.length > 0) && (
        <>
          <p className="products__amount">{`${searchResults.length} results`}</p>

          <div className="products__cards">
            {searchResults.map(result => (
              <ProductCard key={result.id} product={result} />
            ))}
          </div>
        </>
      )}

      {(query && !searchResults.length) && (
        <NoSearchResults />
      )}

      {(!query && products.length > 0) && (
        <>
          <Breadcrumbs />

          <h1 className="products__title">{title}</h1>

          <p className="products__amount">{`${products.length} models`}</p>

          {filtersIsVisible && (
            <div className="products__filters">
              <div className="products__sort">
                <p className="products__filter-type">Sort by</p>

                <Dropdown
                  items={dropdownSortItems}
                  onSearchChange={handleSortChange}
                  onPageChange={handlePageChange}
                  initialName={sortButtonName}
                />
              </div>

              <div className="products__items">
                <p className="products__filter-type">Items on page</p>

                <Dropdown
                  items={dropdownPerPageItems}
                  onSearchChange={handlePerPageChange}
                  onPageChange={handlePageChange}
                  initialName={perPageButtonName}
                />
              </div>
            </div>
          )}

          <div className="products__cards">
            {perPage === 'all' ? (
              sortProducts(products, sort).map(phone => (
                <ProductCard key={phone.id} product={phone} />
              ))
            ) : (
              sortProducts(products, sort)
                .slice(itemStart, itemEnd)
                .map(phone => (
                  <ProductCard key={phone.id} product={phone} />
                ))
            )}
          </div>

          {(perPage !== 'all' && filtersIsVisible) && (
            <Pagination
              total={products.length}
              perPage={Number(perPage)}
              currentPage={Number(currentPage)}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};
