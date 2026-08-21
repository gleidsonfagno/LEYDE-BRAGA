export const LEYDE = {
  nomeLoja: 'LEYDE BRAGA',
  cidade: 'Altamira',
  uf: 'PA',
  instagram: 'flor_da_manha_leydebraga',
  whatsapp: '559491653467',
  whatsappExibicao: '(94) 9165-3467',
  horario: [
    { dias: 'Segunda a Sexta', horas: '08h às 18h' },
    { dias: 'Sábado', horas: '08h às 14h' },
    { dias: 'Domingo', horas: 'Fechado' },
  ],
  categorias: [
    { id: 'perfumaria', nome: 'Perfumaria', desc: 'Fragrâncias exclusivas para ele e para ela.' },
    { id: 'corpo-e-banho', nome: 'Corpo & Banho', desc: 'Hidratantes e cuidados corporais.' },
    { id: 'cabelos', nome: 'Cabelos', desc: 'Shampoos e tratamento para seus fios.' },
    { id: 'maquiagem', nome: 'Maquiagem', desc: 'Beleza com acabamento sofisticado.' },
  ],
  marcas: ['Natura', 'Hinode', 'O Boticário', 'Mary Kay'],
  bairrosEntrega: [],
  formasPagamento: ['Pix', 'Dinheiro', 'Cartão de crédito', 'Boleto'],
  prefixoPedido: 'LB',
};

export function whatsappLink(texto) {
  const phone = String(LEYDE.whatsapp || '').replace(/\D/g, '');
  return `https://wa.me/${phone}?text=${encodeURIComponent(texto || '')}`;
}

export function categoriaDe(id) {
  return (LEYDE.categorias || []).find((categoria) => categoria.id === id) || null;
}
