import Link from 'next/link';
import ProductCard from '../../components/ProductCard';
import { LEYDE, categoriaDe } from '../../lib/config';
import { PRODUTOS } from '../../lib/products';
import { normalizeText } from '../../lib/text';

function Chip({ href, label, active }) {
  return (
    <Link className={`chip${active ? ' ativo' : ''}`} href={href}>
      {label}
    </Link>
  );
}

function buildHref(cat, marca, q) {
  const params = new URLSearchParams();
  if (cat) params.set('cat', cat);
  if (marca) params.set('marca', marca);
  if (q) params.set('q', q);
  const search = params.toString();
  return search ? `/categoria?${search}` : '/categoria';
}

export default function CategoriaPage({ searchParams }) {
  const catAtual = searchParams?.cat || '';
  const marcaAtual = searchParams?.marca ? decodeURIComponent(searchParams.marca) : '';
  const q = (searchParams?.q || '').trim();

  const lista = PRODUTOS.filter((produto) => {
    if (catAtual && produto.categoria !== catAtual) return false;
    if (marcaAtual && normalizeText(produto.marca) !== normalizeText(marcaAtual)) return false;
    if (q) {
      const alvo = normalizeText(`${produto.nome} ${produto.marca} ${produto.descricao || ''}`);
      const termos = normalizeText(q).split(' ').filter(Boolean);
      if (!termos.every((termo) => alvo.includes(termo))) return false;
    }
    return true;
  });

  const titulo = catAtual
    ? categoriaDe(catAtual)?.nome || 'Categorias'
    : marcaAtual
      ? marcaAtual
      : q
        ? `Resultados para "${q}"`
        : 'Categorias';

  return (
    <main className="container">
      <div className="breadcrumb">
        <Link href="/">Início</Link> / <span id="crumb-atual">{titulo}</span>
      </div>

      <h1 className="pagina-titulo" id="pagina-titulo">
        {titulo}
      </h1>

      <div className="filtros" id="filtros-cat">
        <Chip href={buildHref('', marcaAtual, q)} label="Todas" active={!catAtual && !marcaAtual && !q} />
        {LEYDE.categorias.map((categoria) => (
          <Chip
            key={categoria.id}
            href={buildHref(categoria.id, marcaAtual, q)}
            label={categoria.nome}
            active={catAtual === categoria.id}
          />
        ))}
      </div>

      <div className="filtros" id="filtros-marca">
        <Chip href={buildHref(catAtual, '', q)} label="Todas as marcas" active={!marcaAtual} />
        {LEYDE.marcas.map((marca) => (
          <Chip
            key={marca}
            href={buildHref(catAtual, marca, q)}
            label={marca}
            active={marcaAtual === marca}
          />
        ))}
      </div>

      <div id="contador" style={{ fontSize: '13px', color: 'var(--muted-2)', marginBottom: '14px' }}>
        {lista.length} {lista.length === 1 ? 'produto' : 'produtos'}
      </div>

      {lista.length > 0 ? (
        <div className="grid-prod" id="grid-produtos">
          {lista.map((produto) => (
            <ProductCard key={produto.slug} produto={produto} />
          ))}
        </div>
      ) : (
        <div id="vazio" style={{ display: 'block', textAlign: 'center', padding: '40px 0', color: 'var(--muted)' }}>
          Nenhum produto encontrado para este filtro.
        </div>
      )}
    </main>
  );
}
