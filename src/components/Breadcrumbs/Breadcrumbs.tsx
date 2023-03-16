import { Link, useLocation } from 'react-router-dom';
import { capitalizeFirstLetter } from '../../helpers';
import { ReactComponent as HomeIcon } from '../../assets/svg/home.svg';
import arrowRightDisabled from '../../assets/svg/arrowRightDisabled.svg';

type Props = {
  productName?: string;
};

export const Breadcrumbs: React.FC<Props> = ({ productName }) => {
  const { pathname } = useLocation();
  const categoryCatalog = pathname.split('/')[1];

  return (
    <div className="breadcrumbs" data-cy="breadCrumbs">
      <Link to="/" className="breadcrumbs__home">
        <HomeIcon />
      </Link>

      {productName ? (
        <>
          <Link
            to={`/${categoryCatalog}`}
            className="breadcrumbs__category"
          >
            <img
              className="breadcrumbs__arrow"
              src={arrowRightDisabled}
              alt="arrowRight"
            />

            <span className="breadcrumbs__text breadcrumbs__text--active">
              {capitalizeFirstLetter(categoryCatalog)}
            </span>
          </Link>

          <div className="breadcrumbs__item">
            <img
              className="breadcrumbs__arrow"
              src={arrowRightDisabled}
              alt="arrowRight"
            />

            <span className="breadcrumbs__text">
              {productName}
            </span>
          </div>
        </>
      ) : (
        <div className="breadcrumbs__category">
          <img
            className="breadcrumbs__arrow"
            src={arrowRightDisabled}
            alt="arrowRight"
          />

          <span className="breadcrumbs__text">
            {capitalizeFirstLetter(categoryCatalog)}
          </span>
        </div>
      )}
    </div>
  );
};
