import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { entrar } from '../../api/usuarios';
import './login.css';

export default function Login() {
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const enviar = async (event: FormEvent) => {
    event.preventDefault();
    setErro(null);

    if (!login.trim() || !senha) {
      setErro('Informe o usuário e a senha.');
      return;
    }

    setEnviando(true);
    try {
      const usuario = await entrar(login.trim(), senha);
      sessionStorage.setItem('usuario', JSON.stringify(usuario));
      navigate('/painel');
    } catch (error) {
      setErro(error instanceof Error ? error.message : 'Não foi possível entrar.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="login-page">
      <Coqueiro className="login-coqueiro esquerda" />
      <Coqueiro className="login-coqueiro direita" />

      <div className="login-card">
        <div className="login-divisor" aria-hidden="true">
          <span />
          <span />
        </div>
        <h1>Acessar sistema</h1>
        <p>Sistema de gestão</p>

        <form onSubmit={enviar}>
          <div className="login-input">
            <label className="login-sr" htmlFor="login">E-mail ou usuário</label>
            <UsuarioIcone />
            <input
              id="login"
              value={login}
              onChange={(event) => setLogin(event.target.value)}
              autoComplete="username"
              placeholder="Digite seu usuário ou e-mail"
            />
          </div>

          <div className="login-input">
            <label className="login-sr" htmlFor="senha">Senha</label>
            <CadeadoIcone />
            <input
              id="senha"
              type={mostrarSenha ? 'text' : 'password'}
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              autoComplete="current-password"
              placeholder="Digite sua senha"
            />
            <button
              type="button"
              className="login-olho"
              onClick={() => setMostrarSenha((valor) => !valor)}
              aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
            >
              <OlhoIcone aberto={mostrarSenha} />
            </button>
          </div>

          <p className="login-esqueci">Esqueceu minha senha?</p>

          {erro && <p className="login-erro" role="alert">{erro}</p>}

          <button type="submit" disabled={enviando}>
            {enviando ? 'Entrando...' : 'Entrar no sistema'}
            {!enviando && <span aria-hidden="true">→</span>}
          </button>
        </form>

        <div className="login-palmeira" aria-hidden="true">
          <span />
          <Palmeira />
          <span />
        </div>
      </div>

      <Ondas />
    </div>
  );
}

function Coqueiro({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 300 246" aria-hidden="true">
      <path
        fill="currentColor"
        d="M171.2,44.9C192.5,18,267-10.4,296.5,29c-10.1,0-19.9,0-30,0c-6.5,1.4-0.2,6.2-3.5,8.8c-10.4-5.1-19.9,4.2-31.8,3.5c-0.7,6.5,7.2,4.6,5.3,12.4c-7.2-3-20.6,1.2-26.5,5.3c19.4,4.1,39.7-4.4,58.2,1.8c22.8,7.6,26.3,41.1,8.8,56.5c-5.3-3.5-5.5-12.2-8.8-17.6c-6.5-1.9-2.8,6.7-8.8,5.3c-4.4-9.2-13.2-13.9-22.9-17.6c-3.9,0.7,0,9.4-3.5,10.6c-8.3-1.1-12.7-6.2-22.9-5.3c30,29.8-2.6,69.9-30,79.4c-6.2-7.2,10.1-19.8,5.3-37.1c-7.8-1.4-10.9,7.6-15.9,3.5c4.6-4.9,6-12.7,5.3-22.9c-5.1,1.9-11.6,2.5-15.9,5.3c-7.1-1.9,0.2-7.2-1.8-14.1c-34.4,27.4-44.1,79.4-49.4,135.9c-12.9,0-25.9,0-38.8,0c5.6-63.2,28.8-108.9,61.8-144.7c-12.5,2.1-17.1,12.4-24.7,19.4c-6.4,2.8-1.1-6-5.3-5.3C89.8,117,85.9,129,79.4,138.4c-7.1,0-5.8-8.3-10.6-10.6c-9.5,3.5-13.4,12.5-19.4,19.4c-9.4-3.4-6.9-16.2-5.3-21.2c6.9-21.2,44.5-38.8,67.1-44.1C97.9,72.4,80.5,87,67.1,89c-1.2-5.5,1.8-6.4,1.8-10.6c-14.5,2.6-22.1,12-31.8,19.4c-5.5,0.9-4.9-4.4-7.1-7.1c-13.1,4.1-16.9,17.1-30,21.2c0.7-61.6,74.6-77.8,132.4-60c-3.2-9.2-11.3-13.4-21.2-15.9c-0.2-3.2,2.1-3.7,1.8-7.1c-12-2.8-26.5-1.8-38.8,0c-1.4-6.7,6.7-3.9,7.1-8.8c-7.1-6.4-22.4,3.4-28.2-1.8C84.5-12.3,166.6-5.3,171.2,44.9z"
      />
    </svg>
  );
}

function Palmeira() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 22V11" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 12C8 11 5 8 4 4c4 1 7 4 8 8zM12 11c4-2 8-2 11-1-2 4-6 6-11 5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function Ondas() {
  return (
    <svg className="login-ondas" viewBox="0 0 1440 180" preserveAspectRatio="none" aria-hidden="true">
      <path fill="#ff9a2e" d="M0 70C240 130 480 20 720 80C960 140 1200 40 1440 90L1440 180L0 180Z" />
      <path fill="#1aa7cf" d="M0 110C240 160 480 80 720 120C960 160 1200 90 1440 130L1440 180L0 180Z" />
      <path fill="#0e86b8" d="M0 140C320 170 640 120 960 150C1200 170 1320 140 1440 155L1440 180L0 180Z" />
    </svg>
  );
}

function UsuarioIcone() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M5 19c1.4-3 3.8-4.5 7-4.5S17.6 16 19 19" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function CadeadoIcone() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8 10V8a4 4 0 0 1 8 0v2" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function OlhoIcone({ aberto }: { aberto: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6z" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.7" />
      {!aberto && <path d="M4 5l16 14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />}
    </svg>
  );
}
