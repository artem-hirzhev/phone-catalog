import classNames from 'classnames';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { desktopScreen } from '../../constants';
import { ReactComponent as CrossIcon } from '../../assets/svg/close.svg';
import { ReactComponent as SearchIcon } from '../../assets/svg/search.svg';
import { useDebounce } from '../../hooks';

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const debouncedValue = useDebounce<string>(query, 700);

  const handleSearch = (value: string) => {
    if (value.trim() === '') {
      searchParams.delete('query');
    } else {
      searchParams.set('query', value.toLowerCase());
    }

    setSearchParams(searchParams);
  };

  const clearSearch = () => {
    setQuery('');
    searchParams.delete('query');
    setSearchParams(searchParams);
  };

  useEffect(() => {
    handleSearch(query);
  }, [debouncedValue]);

  const { pathname } = useLocation();
  const category = pathname.split('/')[1];

  const placeholderText = desktopScreen ? `Search in ${category}...` : 'Search...';
  const searchSize = desktopScreen ? 27 : 11;

  return (
    <form className="search" onSubmit={e => e.preventDefault()}>
      <input
        type="text"
        className="search__field"
        value={query}
        placeholder={placeholderText}
        maxLength={searchSize}
        onChange={e => setQuery(e.target.value)}
      />

      <button
        type="button"
        className={classNames(
          'search__button',
          { 'search__button--active': query },
        )}
        disabled={!query}
        onClick={clearSearch}
      >
        {query ? (
          <CrossIcon />
        ) : (
          <SearchIcon />
        )}
      </button>
    </form>
  );
};
