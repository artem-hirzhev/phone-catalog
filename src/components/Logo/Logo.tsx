import { Link } from 'react-router-dom';
import { ReactComponent as LogoIcon } from '../../assets/svg/logo.svg';

export const Logo = () => (
  <Link to="/" className="logo">
    <LogoIcon />
  </Link>
);
