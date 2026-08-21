'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../../components/CartContext';
import { buscarProduto, formatarBRL } from '../../lib/products';

export default function CarrinhoPage() {
  const { cart, mudarQtd, remover, salvar, ready } = useCart();
  const router = useRouter();

  const linhas = useMemo(
    () =>
      cart
        .map((item) => {
          const produto = buscarProduto(item.slug);
          return produto && produto.disponibilidade !== 'indisponivel' && item.qtd > 0 ? { produto, qtd: item.qtd } : null;
        })
        .filter(Boolean),
    [cart],
  );

  const subtotal = linhas.reduce((sum, linha) => sum + (linha.produto.preco || 0) * linha.qtd, 0);
  const temValores = linhas.every((linha) => linha.produto.preco > 0);

  const handleFinalizar = () => {
    salvar(linhas.map((linha) => ({ slug: linha.produto.slug, qtd: linha.qtd })));
    router.push('/checkout');
  };

  if (!ready) {
    return (
      <main className="container">
        <h1 className="pagina-titulo">Meu carrinho</h1>
        <div style={{ textAlign: 'center', padding: '50px 0', color: 'var(--muted)' }}>
          Carregando carrinho...
        </div>
      </main>
    );
  }

  if (!linhas.length) {
    return (
      <main className="container">
        <div className="breadcrumb">
          <Link href="/">Início</Link> / Carrinho
        </div>
        <h1 className="pagina-titulo">Meu carrinho</h1>
        <div style={{ textAlign: 'center', padding: '50px 0', color: 'var(--muted)' }}>
          <p style={{ fontSize: '18px', marginBottom: '8px' }}>Seu carrinho está vazio.</p>
          <Link className="btn solid" href="/">
            Continuar comprando
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container">
      <div className="breadcrumb">
        <Link href="/">Início</Link> / Carrinho
      </div>
      <h1 className="pagina-titulo">Meu carrinho</h1>

      <div className="pg-layout">
        <div id="carrinho-itens">
          <table className="tabela-carrinho">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Preço</th>
                <th>Quantidade</th>
                <th>Total</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {linhas.map(({ produto, qtd }) => {
                const total = produto.preco > 0 ? formatarBRL(produto.preco * qtd) : '—';
                return (
                  <tr key={produto.slug}>
                    <td>
                      <div className="ci">
                        <Link href={`/produto?p=${produto.slug}`}>
                          <img src={produto.imagem} alt={produto.nome} />
                        </Link>
                        <div>
                          <Link href={`/produto?p=${produto.slug}`} style={{ fontWeight: 500 }}>
                            {produto.nome}
                          </Link>
                          <div style={{ color: 'var(--muted-2)', fontSize: '11px', marginTop: '2px' }}>{produto.marca}</div>
                        </div>
                      </div>
                    </td>
                    <td>{produto.preco > 0 ? formatarBRL(produto.preco) : '—'}</td>
                    <td>
                      <div className="qtd-stepper" style={{ height: '34px' }}>
                        <button type="button" style={{ height: '34px', width: '30px' }} onClick={() => mudarQtd(produto.slug, qtd - 1)}>
                          −
                        </button>
                        <input
                          type="number"
                          value={qtd}
                          min="1"
                          onChange={(event) => mudarQtd(produto.slug, parseInt(event.target.value, 10) || 1)}
                          style={{ height: '34px', width: '40px' }}
                        />
                        <button type="button" style={{ height: '34px', width: '30px' }} onClick={() => mudarQtd(produto.slug, qtd + 1)}>
                          +
                        </button>
                      </div>
                    </td>
                    <td>{total}</td>
                    <td>
                      <button className="rem" onClick={() => remover(produto.slug)}>
                        Remover
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <aside className="resumo" id="carrinho-resumo">
          <h3>Resumo do pedido</h3>
          <div className="linha">
            <span>Subtotal</span>
            <span>{temValores ? formatarBRL(subtotal) : 'a definir'}</span>
          </div>
          <div className="linha">
            <span>Entrega</span>
            <span>no checkout</span>
          </div>
          <div className="linha total">
            <span>Total</span>
            <span>{temValores ? formatarBRL(subtotal) : 'a definir'}</span>
          </div>
          <button className="btn solid block" id="btn-finalizar" onClick={handleFinalizar}>
            Finalizar pedido
          </button>
          <div className="aviso">
            Entrega e formas de pagamento são definidas no próximo passo. Pedidos são confirmados pelo WhatsApp.
          </div>
        </aside>
      </div>
    </main>
  );
}
