import { useState } from 'react';
import classNames from 'classnames';
import { DropdownItem } from '../../types';
import { ReactComponent as ArrowUp } from '../../assets/svg/arrowUp.svg';
import { ReactComponent as ArrowDown } from '../../assets/svg/arrowDown.svg';

type Props = {
  items: DropdownItem[];
  onSearchChange: (value: string) => void;
  onPageChange: (page: number) => void,
  initialName: string | undefined;
};

export const Dropdown: React.FC<Props> = (
  {
    items,
    onSearchChange,
    onPageChange,
    initialName,
  },
) => {
  const [buttonName, setButtonName] = useState(initialName);
  const [open, setOpen] = useState(false);

  const handleChange = (value: string, name: string) => {
    setButtonName(name);
    onSearchChange(value);
    onPageChange(1);
    setOpen(false);
  };

  return (
    <div className="dropdown" onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        className="dropdown__arrow"
        onClick={() => setOpen(state => !state)}
      >
        {buttonName}

        {open ? (
          <ArrowUp />
        ) : (
          <ArrowDown />
        )}
      </button>

      <div className={classNames(
        'dropdown__menu',
        { 'dropdown__menu--open': open },
      )}
      >
        {items.map(item => (
          <button
            key={item.id}
            type="button"
            className="dropdown__item"
            value={item.value}
            onClick={() => handleChange(item.value, item.name)}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};
