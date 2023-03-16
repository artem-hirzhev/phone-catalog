import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProductsByCategory } from '../../api/api';
import { Category } from '../../types';

type Props = {
  category: Category;
};

export const CategoryCard: React.FC<Props> = ({ category }) => {
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    getProductsByCategory(category.path)
      .then(result => setQuantity(result.length))
      .catch(() => setQuantity(0));
  }, []);

  return (
    <div className="category">
      <Link to={category.path} className="category__link">
        <img
          src={category.img}
          alt={category.path}
          className="category__img"
        />
      </Link>

      <Link
        to={category.path}
        className="category__link"
      >
        {category.title}
      </Link>

      <p className="category__quantity">{`${quantity} models`}</p>
    </div>
  );
};
