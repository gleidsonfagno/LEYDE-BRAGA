import ProductCard from './ProductCard';

export default function Shelf({ titulo, subtitulo, produtos }) {
  if (!produtos || produtos.length === 0) {
    return null;
  }

  return (
    <section className="secao">
      <div className="container">
        <div className="secao-titulo">
          {subtitulo ? <span className="script">{subtitulo}</span> : null}
          <h2>{titulo}</h2>
        </div>
        <div className="grid-prod">
          {produtos.map((produto) => (
            <ProductCard key={produto.slug} produto={produto} />
          ))}
        </div>
      </div>
    </section>
  );
}
