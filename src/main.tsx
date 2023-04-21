import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import App from './App';
import './index.scss';

import { NotFoundPage } from './pages/NotFoundPage';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import {
  ProductDetailsPage,
} from './pages/ProductDetailsPage/ProductDetailsPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { CartPage } from './pages/CartPage';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="*" element={<NotFoundPage />} />

          <Route index element={<HomePage />} />

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
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>,
);
