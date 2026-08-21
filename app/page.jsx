import BrandsBar from '../components/BrandsBar';
import CategoryTiles from '../components/CategoryTiles';
import Hero from '../components/Hero';
import Shelf from '../components/Shelf';
import { PRODUTOS } from '../lib/products';

export default function HomePage() {
  const destaques = PRODUTOS.filter((produto) => produto.destaque && produto.disponibilidade !== 'indisponivel');
  const novidades = PRODUTOS.filter((produto) => !produto.destaque);

  return (
    <main>
      <Hero />
      <CategoryTiles />
      <Shelf titulo="Produtos em destaque" subtitulo="destaques da loja" produtos={destaques} />
      <Shelf titulo="Complete sua rotina" subtitulo="mais da loja" produtos={novidades} />
      <BrandsBar />
    </main>
  );
}
