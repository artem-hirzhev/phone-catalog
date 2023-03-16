import { mobileScreen } from '../../constants';
import { ButtonSecondary } from '../ButtonSecondary';
import { ReactComponent as ArrowLeft } from '../../assets/svg/arrowLeft.svg';
import { ReactComponent as ArrowRight } from '../../assets/svg/arrowRight.svg';
import {
  ReactComponent as ArrowLeftDisabled,
} from '../../assets/svg/arrowLeftDisabled.svg';
import {
  ReactComponent as ArrowRightDisabled,
} from '../../assets/svg/arrowRightDisabled.svg';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination: React.FC<Props> = (
  {
    total,
    perPage,
    currentPage,
    onPageChange,
  },
) => {
  const getPagesNumbers = (from: number, to: number): number[] => {
    const numbers = [];

    for (let n = from; n <= to; n += 1) {
      numbers.push(n);
    }

    return numbers;
  };

  const getPagesCount = (): number => {
    let result = 0;

    if (total % perPage === 0) {
      result = total / perPage;
    }

    if (total % perPage !== 0) {
      result = Math.floor(total / perPage + 1);
    }

    return result;
  };

  // needed to make small pagination for mobile
  const getThreePages = (pages: number[], current: number): number[] => {
    const currentIndex = pages.findIndex(page => page === current);
    const start = currentIndex === 0 ? 0 : currentIndex - 1;
    const end = currentIndex === 0 ? 3 : currentIndex + 2;

    return [...pages].slice(start, end);
  };

  const pagesCount = getPagesCount();
  const pagesNumbers = getPagesNumbers(1, pagesCount);

  const firstPage = currentPage === 1;
  const lastPage = currentPage === pagesCount;
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  const handleArrows = (page: number) => {
    if (page > pagesCount || page < 1) {
      return;
    }

    onPageChange(page);
  };

  return (
    <div className="pagination">
      <div className="pagination__prev">
        <ButtonSecondary
          handler={() => handleArrows(prevPage)}
          disabled={firstPage}
          width="32px"
          height="32px"
        >
          {firstPage ? (
            <ArrowLeftDisabled />
          ) : (
            <ArrowLeft />
          )}

        </ButtonSecondary>
      </div>

      <div className="pagination__pages">
        {mobileScreen ? (
          <>
            {getThreePages(pagesNumbers, currentPage).map(page => (
              <ButtonSecondary
                key={page}
                height="32px"
                width="32px"
                active={currentPage === page}
                handler={() => onPageChange(page)}
              >
                {page}
              </ButtonSecondary>
            ))}
          </>
        ) : (
          <>
            {pagesNumbers.map(number => (
              <ButtonSecondary
                key={number}
                height="32px"
                width="32px"
                active={currentPage === number}
                handler={() => onPageChange(number)}
              >
                {number}
              </ButtonSecondary>
            ))}
          </>
        )}
      </div>

      <div className="pagination__next">
        <ButtonSecondary
          handler={() => handleArrows(nextPage)}
          disabled={lastPage}
          width="32px"
          height="32px"
        >
          {lastPage ? (
            <ArrowRightDisabled />
          ) : (
            <ArrowRight />
          )}

        </ButtonSecondary>
      </div>
    </div>
  );
};
