import { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import type { UsuarioSessao } from '../api/usuarios';
import './painel.css';

const itens = [
  { para: '/painel', rotulo: 'Início', icone: 'inicio' },
  { para: '/pedidos', rotulo: 'Pedidos', icone: 'pedidos' },
  { para: '/mesas', rotulo: 'Mesas', icone: 'mesas' },
  { para: '/produtos', rotulo: 'Produtos', icone: 'produtos' },
  { para: '/usuarios', rotulo: 'Usuários', icone: 'usuarios' },
  { para: '/relatorios', rotulo: 'Relatórios', icone: 'relatorios' },
  { para: '/configuracoes', rotulo: 'Configurações', icone: 'config' },
];

export function rotuloPerfil(perfil: string) {
  const nomes: Record<string, string> = {
    admin: 'Administrador',
    atendente: 'Atendente',
    cozinha: 'Cozinha',
    caixa: 'Caixa',
  };
  return nomes[perfil] ?? perfil;
}

export default function PainelLayout() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState<UsuarioSessao | null>(null);
  const [aberto, setAberto] = useState(true);

  useEffect(() => {
    const salvo = sessionStorage.getItem('usuario');
    if (!salvo) {
      navigate('/');
      return;
    }
    setUsuario(JSON.parse(salvo) as UsuarioSessao);
  }, [navigate]);

  const sair = () => {
    sessionStorage.removeItem('usuario');
    navigate('/');
  };

  if (!usuario) return null;

  return (
    <div className={aberto ? 'painel menu-aberto' : 'painel menu-fechado'}>
      <aside className="menu">
        <div className="menu-marca">
          <Logo />
          <strong>
            Planalto
            <br />
            Balneário Clube
          </strong>
          <button type="button" className="menu-fechar" onClick={() => setAberto(false)} aria-label="Fechar menu">
            ‹
          </button>
        </div>

        <nav>
          {itens.map((item) => (
            <NavLink key={item.para} to={item.para} className={({ isActive }) => (isActive ? 'ativo' : undefined)}>
              <Icone nome={item.icone} />
              <span>{item.rotulo}</span>
            </NavLink>
          ))}
        </nav>

        <button type="button" className="menu-sair" onClick={sair}>
          <Icone nome="sair" />
          <span>Sair</span>
        </button>
      </aside>

      <div className="painel-miolo">
        <header className="painel-topo">
          <button type="button" className="menu-abrir" onClick={() => setAberto(true)} aria-label="Abrir menu">
            ☰
          </button>
          <div className="painel-usuario">
            <span className="painel-avatar">
              <Icone nome="usuarios" />
            </span>
            <span>
              <strong>{usuario.nome}</strong>
              <small>{rotuloPerfil(usuario.perfil)}</small>
            </span>
          </div>
        </header>
        <main className="painel-pagina">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function Logo() {
  return (
    <svg width="46" height="46" viewBox="0 0 62 62" aria-hidden="true">
      <circle cx="31" cy="31" r="31" fill="#eef7fb" />
      <circle cx="31" cy="22" r="8" fill="#ff8a1e" />
      <path d="M4 39c8 6 14 6 21 0s13-6 21 0 13 6 21 0v8c-8 6-14 6-21 0s-13-6-21 0-13 6-21 0z" fill="#3b93dc" />
      <path d="M4 48c8 5 14 5 21 0s13-5 21 0 13 5 21 0v8c-8 5-14 5-21 0s-13-5-21 0-13 5-21 0z" fill="#1d6fbe" />
    </svg>
  );
}

function Icone({ nome }: { nome: string }) {
  const comum = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': true as const };
  if (nome === 'inicio') {
    return (
      <svg {...comum}>
        <path d="M4 11.5 12 5l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-8.5z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      </svg>
    );
  }
  if (nome === 'pedidos') {
    return (
      <svg {...comum}>
        <path d="M6 7h12l-1 13H7L6 7z" stroke="currentColor" strokeWidth="1.7" />
        <path d="M9 7V5a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    );
  }
  if (nome === 'mesas') {
    return (
      <svg {...comum}>
        <rect x="4" y="8" width="16" height="8" rx="2" stroke="currentColor" strokeWidth="1.7" />
        <path d="M8 16v3M16 16v3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }
  if (nome === 'produtos') {
    return (
      <svg {...comum}>
        <path d="M4 8h16v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8z" stroke="currentColor" strokeWidth="1.7" />
        <path d="M8 8V6a4 4 0 0 1 8 0v2" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    );
  }
  if (nome === 'relatorios') {
    return (
      <svg {...comum}>
        <path d="M5 19V10M12 19V5M19 19v-7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }
  if (nome === 'config') {
    return (
      <svg {...comum}>
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7" />
        <path d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M6 6l1.6 1.6M16.4 16.4 18 18M18 6l-1.6 1.6M7.6 16.4 6 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }
  if (nome === 'sair') {
    return (
      <svg {...comum}>
        <path d="M10 6H6v12h4M10 12h8M15 9l3 3-3 3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg {...comum}>
      <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.7" />
      <path d="M5 19c1.4-3 3.8-4.5 7-4.5S17.6 16 19 19" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}
