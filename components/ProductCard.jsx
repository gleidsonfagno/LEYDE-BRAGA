'use client';

import Link from 'next/link';
import { useCart } from './CartContext';
import { useToast } from './ToastContext';
import { formatarBRL, estoqueLabel } from '../lib/products';

export default function ProductCard({ produto }) {
  const { adicionar } = useCart();
  const { showToast } = useToast();
  const estoque = estoqueLabel(produto);
  const indisponivel = produto.disponibilidade === 'indisponivel';
  const preco = produto.preco > 0 ? formatarBRL(produto.preco) : 'Preço a definir';
  const parcela =
    produto.preco > 0 && produto.parcelas > 1
      ? `ou até ${produto.parcelas}x de ${formatarBRL(produto.preco / produto.parcelas)} sem juros`
      : '';

  const handleAdd = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (adicionar(produto.slug, 1)) {
      showToast('Adicionado ao carrinho');
    }
  };

  return (
    <article className="card" data-od-id={`card-${produto.slug}`}>
      <Link className="card-img" href={`/produto?p=${produto.slug}`}>
        <img loading="lazy" src={produto.imagem} alt={produto.nome} />
      </Link>
      <span className={`est ${estoque.cls}`}>{estoque.txt}</span>
      <h3>
        <Link href={`/produto?p=${produto.slug}`}>{produto.nome}</Link>
      </h3>
      <span className="marca">{produto.marca}</span>
      <div className="preco">
        {preco}
        {parcela ? <span className="parcela">{parcela}</span> : null}
      </div>
      <div className="btns">
        {indisponivel ? (
          <button className="btn block" disabled>
            Indisponível
          </button>
        ) : (
          <button className="btn solid block" data-add-carrinho={produto.slug} data-od-id={`add-${produto.slug}`} onClick={handleAdd}>
            Adicionar
          </button>
        )}
      </div>
    </article>
  );
}
