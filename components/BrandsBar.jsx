'use client';

import Link from 'next/link';
import { LEYDE } from '../lib/config';

const logoMarca = {
  natura: 'natura',
  hinode: 'hinode',
  'o boticário': 'boticario',
  'mary kay': 'marykay',
};

export default function BrandsBar() {
  const handleFallback = (event) => {
    const img = event.currentTarget;
    const nome = img.getAttribute('data-nome') || img.alt || '';
    const link = img.parentElement;
    if (!link) return;
    const fallback = document.createElement('span');
    fallback.className = 'marca-fallback';
    fallback.textContent = nome;
    link.replaceChild(fallback, img);
  };

  return (
    <section className="marcas" data-od-id="marcas">
      <div className="container" id="marcas-linha">
        {LEYDE.marcas.map((marca) => {
          const key = marca.toLowerCase();
          const slug = logoMarca[key] || key;
          return (
            <Link
              key={marca}
              href={`/categoria?marca=${encodeURIComponent(marca)}`}
              data-od-id={`marca-${slug}`}
              aria-label={`Filtrar por marca: ${marca}`}
              title={marca}
            >
              <img
                className="marca-logo"
                src={`/assets/images/marcas/${slug}.svg`}
                alt={marca}
                data-nome={marca}
                loading="lazy"
                onError={handleFallback}
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
