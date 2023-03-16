/* eslint-disable max-len */
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ButtonSecondary } from '../../components/ButtonSecondary';
import { CartContext } from '../../context';
import { CartItem } from '../../types/CartItem';
import { ReactComponent as ArrowLeft } from '../../assets/svg/arrowLeft.svg';
import { ReactComponent as CrossIcon } from '../../assets/svg/close.svg';
import { ReactComponent as MinusDisabledIcon } from '../../assets/svg/minusDisabled.svg';
import { ReactComponent as MinusIcon } from '../../assets/svg/minus.svg';
import { ReactComponent as PlusDisabledIcon } from '../../assets/svg/plusDisabled.svg';
import { ReactComponent as PlusIcon } from '../../assets/svg/plus.svg';

export const CartPage = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const [showMessage, setShowMessage] = useState(false);

  const increaseQuantity = (item: CartItem) => {
    const index = cartItems.indexOf(item);
    const copy = { ...item };

    if (copy.quantity === 10) {
      return;
    }

    copy.quantity += 1;
    const updatedCartItems = [...cartItems.slice(0, index), copy, ...cartItems.slice(index + 1)];

    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);
  };

  const decreaseQuantity = (item: CartItem) => {
    const index = cartItems.indexOf(item);
    const copy = { ...item };

    if (copy.quantity === 1) {
      return;
    }

    copy.quantity -= 1;
    const updatedCartItems = [...cartItems.slice(0, index), copy, ...cartItems.slice(index + 1)];

    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);
  };

  const deleteItem = (id: number) => {
    const updatedCartItems = cartItems.filter(cartItem => cartItem.id !== id);

    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);
  };

  const totalPrice = cartItems.reduce(
    (accum, current) => accum + (current.quantity * current.product.price), 0,
  );

  const totalAmount = cartItems.reduce(
    (accum, current) => accum + current.quantity, 0,
  );

  return (
    <main className="cart">
      {cartItems.length > 0 ? (
        <>
          <Link
            className="cart__back"
            to="/"
          >
            <ArrowLeft />
            Back
          </Link>

          <h1 className="cart__title">Cart</h1>

          <section className="cart__content">
            {cartItems.length > 0 && (
              <div className="cart__items">
                {cartItems.map(cartItem => (
                  <div className="cart__item" key={cartItem.id}>
                    <button
                      type="button"
                      data-cy="cartDeleteButton"
                      className="cart__delete"
                      onClick={() => deleteItem(cartItem.id)}
                    >
                      <CrossIcon />
                    </button>

                    <div className="cart__image">
                      <img src={cartItem.product.image} alt="product" />
                    </div>

                    <div className="cart__product">{cartItem.product.name}</div>

                    <div className="cart__quantity">
                      <ButtonSecondary
                        width="32px"
                        height="32px"
                        handler={() => decreaseQuantity(cartItem)}
                        disabled={cartItem.quantity === 1}
                      >
                        {cartItem.quantity === 1 ? (
                          <MinusDisabledIcon />
                        ) : (
                          <MinusIcon />
                        )}
                      </ButtonSecondary>

                      {cartItem.quantity}

                      <ButtonSecondary
                        width="32px"
                        height="32px"
                        handler={() => increaseQuantity(cartItem)}
                        disabled={cartItem.quantity === 10}
                      >
                        {cartItem.quantity === 10 ? (
                          <PlusDisabledIcon />
                        ) : (
                          <PlusIcon />
                        )}
                      </ButtonSecondary>
                    </div>

                    <div className="cart__price">
                      {`$${cartItem.product.price}`}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="cart__checkout">
              <div className="cart__total-price">{`$${totalPrice}`}</div>

              <div
                className="cart__total-quantity"
                data-cy="productQauntity"
              >
                {`Total for ${totalAmount} items`}
              </div>

              <button
                type="button"
                className="cart__button-checkout"
                onClick={() => {
                  setShowMessage(true);
                }}
              >
                Checkout
              </button>
            </div>

            {showMessage && (
              <div className="cart__message">
                <span className="cart__message-text">
                  We are sorry, but this feature is not implemented yet
                </span>

                <button
                  type="button"
                  className="cart__message-delete"
                  onClick={() => setShowMessage(false)}
                >
                  <CrossIcon />
                </button>
              </div>
            )}
          </section>
        </>
      ) : (
        <h1 className="cart__empty">Your cart is empty</h1>
      )}
    </main>
  );
};
