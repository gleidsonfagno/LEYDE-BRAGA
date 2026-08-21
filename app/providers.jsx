'use client';

import { CartProvider } from '../components/CartContext';
import { ToastProvider } from '../components/ToastContext';

export default function Providers({ children }) {
  return (
    <CartProvider>
      <ToastProvider>{children}</ToastProvider>
    </CartProvider>
  );
}
