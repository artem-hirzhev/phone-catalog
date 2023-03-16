import { useLocation } from 'react-router-dom';
import { capitalizeFirstLetter } from '../../helpers';

export const NoResults: React.FC = () => {
  const { pathname } = useLocation();
  const category = pathname.split('/')[1];

  return (
    <h1 className="no-results">
      {`${capitalizeFirstLetter(category)} not found`}
    </h1>
  );
};
