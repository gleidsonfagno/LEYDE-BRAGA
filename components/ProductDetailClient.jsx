'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { categoriaDe, LEYDE, whatsappLink } from '../lib/config';
import { buscarProduto, estoqueLabel, formatarBRL } from '../lib/products';
import { useCart } from './CartContext';
import { useToast } from './ToastContext';

export default function ProductDetailClient({ slug }) {
  const router = useRouter();
  const { adicionar } = useCart();
  const { showToast } = useToast();

  const produto = buscarProduto(slug);
  const categoria = produto ? categoriaDe(produto.categoria) : null;
  const [activeTab, setActiveTab] = useState('descricao');
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(produto?.imagem || '');

  useEffect(() => {
    if (produto) {
      document.title = `${produto.nome} — LEYDE BRAGA`;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.content = produto.resumo || produto.descricao;
      setMainImage(produto.imagem);
    }
  }, [produto]);

  const estoque = useMemo(() => (produto ? estoqueLabel(produto) : null), [produto]);
  const indisponivel = produto?.disponibilidade === 'indisponivel';
  const preco = produto?.preco > 0 ? formatarBRL(produto.preco) : 'Preço a definir';
  const parcela =
    produto && produto.preco > 0 && produto.parcelas > 1
      ? `até ${produto.parcelas}x de ${formatarBRL(produto.preco / produto.parcelas)} sem juros`
      : '';

  if (!produto) {
    return (
      <main className="container" id="produto-main" style={{ textAlign: 'center', padding: '60px 0', color: 'var(--muted)' }}>
        Produto não encontrado. <Link href="/">Voltar à loja</Link>
      </main>
    );
  }

  const handleAddToCart = () => {
    if (adicionar(produto.slug, quantity)) {
      showToast('Adicionado ao carrinho');
    }
  };

  const handleBuyNow = () => {
    if (adicionar(produto.slug, quantity)) {
      router.push('/carrinho');
    }
  };

  const specs = Object.entries(produto.especificacoes || {});

  return (
    <main className="container" id="produto-main">
      <div className="breadcrumb">
        <Link href="/">Início</Link>
        {categoria ? (
          <>
            {' / '}
            <Link href={`/categoria?cat=${encodeURIComponent(categoria.id)}`}>{categoria.nome}</Link>
          </>
        ) : null}
        {' / '}
        {produto.nome}
      </div>

      <div className="produto">
        <div className="produto-galeria">
          <div className="galeria-main">
            <img id="galeria-img" src={mainImage} alt={produto.nome} />
          </div>
          <div className="galeria-minis">
            <img className="ativo" src={produto.imagem} alt="Foto 1" data-src={produto.imagem} onClick={() => setMainImage(produto.imagem)} />
          </div>
        </div>

        <div className="produto-info">
          <p className="p-marca">{produto.marca}</p>
          <h1>{produto.nome}</h1>
          {estoque ? <p className={`p-est ${estoque.cls}`}>{estoque.txt}</p> : null}
          <p className="p-preco">{preco}</p>
          {parcela ? <p className="p-parcela">{parcela}</p> : null}
          <p className="p-resumo" style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '12px' }}>
            {produto.resumo}
          </p>

          {!indisponivel ? (
            <div className="qtd-linha">
              <label>Quantidade</label>
              <div className="qtd-stepper">
                <button type="button" id="q-menos" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  −
                </button>
                <input
                  id="q-input"
                  type="number"
                  value={quantity}
                  min="1"
                  max="99"
                  onChange={(event) => setQuantity(Math.min(99, Math.max(1, parseInt(event.target.value, 10) || 1)))}
                />
                <button type="button" id="q-mais" onClick={() => setQuantity(Math.min(99, quantity + 1))}>
                  +
                </button>
              </div>
            </div>
          ) : null}

          <div className="p-botoes">
            {indisponivel ? (
              <button className="btn block" disabled style={{ justifyContent: 'center' }}>
                Produto indisponível
              </button>
            ) : (
              <>
                <button className="btn solid block" id="btn-comprar" onClick={handleBuyNow}>
                  Comprar agora
                </button>
                <button className="btn block" id="btn-carrinho" onClick={handleAddToCart}>
                  Adicionar ao carrinho
                </button>
              </>
            )}
          </div>

          <p style={{ fontSize: '12px', color: 'var(--muted-2)' }}>
            Entrega em {LEYDE.cidade} — {LEYDE.uf}. Dúvidas?{' '}
            <a href={whatsappLink(`Olá! Tenho dúvidas sobre o produto ${produto.nome}.`)} target="_blank" rel="noopener noreferrer">
              Fale no WhatsApp
            </a>
            .
          </p>
        </div>
      </div>

      <section className="p-abas">
        <div className="p-aba-titulos">
          <button className={activeTab === 'descricao' ? 'ativo' : ''} data-aba="descricao" onClick={() => setActiveTab('descricao')}>
            Descrição
          </button>
          <button className={activeTab === 'espec' ? 'ativo' : ''} data-aba="espec" onClick={() => setActiveTab('espec')}>
            Especificações
          </button>
          <button className={activeTab === 'composicao' ? 'ativo' : ''} data-aba="composicao" onClick={() => setActiveTab('composicao')}>
            Composição
          </button>
          <button className={activeTab === 'uso' ? 'ativo' : ''} data-aba="uso" onClick={() => setActiveTab('uso')}>
            Modo de usar
          </button>
        </div>

        <div className="p-aba" data-painel="descricao" style={{ display: activeTab === 'descricao' ? '' : 'none' }}>
          {produto.descricao}
        </div>
        <div className="p-aba" data-painel="espec" style={{ display: activeTab === 'espec' ? '' : 'none' }}>
          <table>
            <tbody>
              {specs.map(([key, value]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-aba" data-painel="composicao" style={{ display: activeTab === 'composicao' ? '' : 'none' }}>
          {produto.composicao}
        </div>
        <div className="p-aba" data-painel="uso" style={{ display: activeTab === 'uso' ? '' : 'none' }}>
          {produto.modoUso}
        </div>
      </section>
    </main>
  );
}
