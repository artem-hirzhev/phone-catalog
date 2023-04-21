import { Outlet } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';

const App = () => {
  return (
    <CartProvider>
      <FavoritesProvider>
        <div className="App">
          <Header />

          <Outlet />

          <Footer />
        </div>
      </FavoritesProvider>
    </CartProvider>
  );
};

export default App;
