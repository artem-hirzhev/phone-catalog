import { Route, Routes } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { FavoritesPage } from './pages/FavoritesPage';
import { CartPage } from './pages/CartPage';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { ProductDetailsPage }
  from './pages/ProductDetailsPage/ProductDetailsPage';
import { NotFoundPage } from './pages/NotFoundPage';

const App = () => {
  return (
    <CartProvider>
      <FavoritesProvider>
        <div className="App">
          <Header />

          <Routes>
            <Route path="*" element={<NotFoundPage />} />

            <Route path="/" element={<HomePage />} />

            <Route path="phones">
              <Route index element={<PhonesPage />} />
              <Route path=":productId" element={<ProductDetailsPage />} />
            </Route>

            <Route path="tablets">
              <Route index element={<TabletsPage />} />
              <Route path=":productId" element={<ProductDetailsPage />} />
            </Route>

            <Route path="accessories">
              <Route index element={<AccessoriesPage />} />
              <Route path=":productId" element={<ProductDetailsPage />} />
            </Route>

            <Route path="favorites" element={<FavoritesPage />} />

            <Route path="cart" element={<CartPage />} />
          </Routes>

          <Footer />
        </div>
      </FavoritesProvider>
    </CartProvider>
  );
};

export default App;
