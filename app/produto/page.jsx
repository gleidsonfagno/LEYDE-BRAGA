import ProductDetailClient from '../../components/ProductDetailClient';

export default function ProdutoPage({ searchParams }) {
  return <ProductDetailClient slug={searchParams?.p || ''} />;
}
