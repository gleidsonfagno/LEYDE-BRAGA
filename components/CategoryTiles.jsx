import Link from 'next/link';
import { LEYDE } from '../lib/config';

const categoryImages = {
  perfumaria: '/assets/images/banners/cat-perfumaria.jpg',
  'corpo-e-banho': '/assets/images/banners/cat-corpo.jpg',
  cabelos: '/assets/images/banners/cat-cabelos.jpg',
  maquiagem: '/assets/images/banners/cat-maquiagem.jpg',
};

export default function CategoryTiles() {
  return (
    <section className="secao" id="categorias" data-od-id="categorias">
      <div className="container">
        <div className="secao-titulo">
          <span className="script">nossas categorias</span>
          <h2>O que você procura</h2>
        </div>
        <div className="grid-cat" id="grid-categorias">
          {LEYDE.categorias.map((categoria) => (
            <Link
              key={categoria.id}
              className="cat-tile"
              data-od-id={`categoria-${categoria.id}`}
              href={`/categoria?cat=${categoria.id}`}
            >
              <img loading="lazy" src={categoryImages[categoria.id]} alt={categoria.nome} />
              <span className="cat-nome">{categoria.nome}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
