import ConfirmacaoClient from '../../components/ConfirmacaoClient';

export default function ConfirmacaoPage({ searchParams }) {
  return <ConfirmacaoClient pedidoQuery={searchParams?.n || ''} />;
}
