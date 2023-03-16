import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Banner } from '../../types';
import { ButtonSecondary } from '../ButtonSecondary';
import { ReactComponent as ArrowLeft } from '../../assets/svg/arrowLeft.svg';
import { ReactComponent as ArrowRight } from '../../assets/svg/arrowRight.svg';

type Props = {
  banners: Banner[];
};

export const BannerSlider: React.FC<Props> = ({ banners }) => {
  const [offset, setOffset] = useState(0);

  const getCurrent = () => {
    switch (offset) {
      case 0:
        return 1;

      case -100:
        return 2;

      default:
        return 3;
    }
  };

  const changeCurrent = (id: number) => {
    switch (id) {
      case 1:
        setOffset(0);
        break;

      case 2:
        setOffset(-100);
        break;

      default:
        setOffset(-200);
    }
  };

  const pressNext = () => {
    if (offset === -200) {
      setOffset(0);

      return;
    }

    setOffset(prev => prev - 100);
  };

  const pressPrev = () => {
    if (offset === 0) {
      setOffset(-200);

      return;
    }

    setOffset(prev => prev + 100);
  };

  let timeoutId: NodeJS.Timeout;

  useEffect(() => {
    timeoutId = setTimeout(pressNext, 2000);

    return () => clearTimeout(timeoutId);
  }, [offset]);

  return (
    <div className="banner">
      <div className="banner__slider">
        <ButtonSecondary
          handler={pressPrev}
          width="32px"
          height="100%"
        >
          <ArrowLeft />
        </ButtonSecondary>

        <div className="banner__container">
          <div className="banner__links" style={{ transform: `translate(${offset}%)` }}>
            {banners.map(banner => (
              <Link
                className="banner__link"
                to={banner.path}
                key={banner.id}
                style={{ backgroundImage: `url(${banner.img})` }}
              >
                {/* <div
                  className="banner__img"
                  style={{ backgroundImage: `url(${banner.img})` }}
                /> */}
              </Link>
            ))}
          </div>
        </div>

        <ButtonSecondary
          handler={pressNext}
          width="32px"
          height="100%"
        >
          <ArrowRight />
        </ButtonSecondary>
      </div>

      <div className="banner__indicators">
        {banners.map(banner => (
          <button
            key={banner.id}
            type="button"
            aria-label="Banner Indicator"
            onClick={() => changeCurrent(banner.id)}
            className={classNames(
              'banner__indicator',
              { 'banner__indicator--active': banner.id === getCurrent() },
            )}
          />
        ))}
      </div>
    </div>
  );
};
