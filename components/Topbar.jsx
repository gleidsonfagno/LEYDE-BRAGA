import { LEYDE } from '../lib/config';

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="container">
        <span>
          Entregas em <b>
            {LEYDE.cidade} — {LEYDE.uf}
          </b>
        </span>
        <span className="topbar-simbolo">·</span>
        <span>Peça pelo WhatsApp: {LEYDE.whatsappExibicao}</span>
      </div>
    </div>
  );
}
