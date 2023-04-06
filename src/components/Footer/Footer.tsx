/* eslint-disable jsx-a11y/label-has-associated-control */
import { ButtonSecondary } from '../ButtonSecondary';
import { Logo } from '../Logo';
import { NavList } from '../NavList';
import { footerLinks } from '../../constants';
import {
  ReactComponent as ArrowUpIcon,
} from '../../assets/svg/arrowUpHover.svg';

export const Footer = () => (
  <footer className="footer">
    <div className="footer__logo">
      <Logo />
    </div>

    <nav className="footer__nav">
      <NavList links={footerLinks} />
    </nav>

    <label className="footer__arrow">
      <span className="footer__arrow-text">BACK TO TOP</span>

      <ButtonSecondary
        handler={() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }}
        width="32px"
        height="32px"
      >
        <ArrowUpIcon />
      </ButtonSecondary>
    </label>
  </footer>
);
