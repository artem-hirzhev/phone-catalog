import { NavLink } from 'react-router-dom';
import { Link } from '../../types';

type Props = {
  links: Link[];
};

export const NavList: React.FC<Props> = ({ links }) => {
  return (
    <ul className="list">
      {links.map(link => (
        <NavLink
          key={link.id}
          to={link.path}
          className={
            ({ isActive }) => (
              isActive ? 'list__item list__item--active' : 'list__item'
            )
          }
        >
          {link.text}
        </NavLink>
      ))}
    </ul>
  );
};
