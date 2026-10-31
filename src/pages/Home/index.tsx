import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { UsuarioSessao } from '../../api/usuarios';

export default function Home() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState<UsuarioSessao | null>(null);

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
    <div className="flex min-h-screen items-center justify-center bg-[#f6f7f4] p-6">
      <div className="w-full max-w-md rounded-[28px] bg-white p-8 text-center shadow-[0_18px_50px_rgba(20,40,30,0.08)]">
        <p className="text-sm font-semibold uppercase tracking-wider text-[#178a3e]">Planalto Balneário</p>
        <h1 className="mt-3 text-2xl font-extrabold text-[#163828]">Olá, {usuario.nome}</h1>
        <p className="mt-2 text-sm text-[#7b8b82]">
          Você entrou como {usuario.login} ({usuario.perfil}).
        </p>
        <button
          type="button"
          onClick={sair}
          className="mt-8 w-full rounded-full bg-[#178a3e] py-3 text-sm font-bold text-white"
        >
          Sair
        </button>
      </div>
    </div>
  );
}
