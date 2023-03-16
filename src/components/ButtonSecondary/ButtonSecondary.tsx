import classNames from 'classnames';

type Props = {
  handler: () => void;
  disabled?: boolean;
  active?: boolean;
  width: string;
  height: string;
  children: React.ReactNode;
};

export const ButtonSecondary: React.FC<Props> = (
  {
    handler,
    disabled,
    active,
    width,
    height,
    children,
  },
) => (
  <button
    type="button"
    onClick={handler}
    disabled={disabled}
    style={{ width, height }}
    className={classNames(
      'button-secondary',
      {
        'button-secondary--disabled': disabled,
        'button-secondary--active': active,
      },
    )}
  >
    {children}
  </button>
);
