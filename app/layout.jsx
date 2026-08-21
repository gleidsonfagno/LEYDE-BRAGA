import './globals.css';
import PageShell from '../components/PageShell';
import Providers from './providers';

export const metadata = {
  title: 'LEYDE BRAGA — Perfumaria e Cosméticos em Altamira/PA',
  description:
    'Loja de perfumaria e cosméticos em Altamira — PA. Natura, Hinode, O Boticário e Mary Kay. Entregas locais e pedidos pelo WhatsApp.',
  icons: {
    icon: '/assets/images/favicon.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>
          <PageShell>{children}</PageShell>
        </Providers>
      </body>
    </html>
  );
}
