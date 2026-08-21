import Footer from './Footer';
import Header from './Header';
import Navigation from './Navigation';
import Topbar from './Topbar';

export default function PageShell({ children }) {
  return (
    <div data-loja="leyde">
      <Topbar />
      <Header />
      <Navigation />
      {children}
      <Footer />
    </div>
  );
}
