import { Link } from 'react-router-dom';
import { useTeste } from '../../hooks/useTeste';

export default function Home() {
  const { dados, carregando, erro } = useTeste();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-6">
      <div className="max-w-md w-full bg-slate-900/60 backdrop-blur-md rounded-3xl shadow-2xl p-8 text-center border border-slate-800">
        
        <div className="inline-flex items-center justify-center p-4 bg-indigo-500/10 rounded-2xl text-indigo-400 mb-6 border border-indigo-500/20">
          <span className="text-3xl">✨</span>
        </div>
        
        <h1 className="text-3xl font-black text-white tracking-tight mb-2">
          System Project
        </h1>
        
        <p className="text-slate-400 mb-8 text-sm">
          Uma interface ampla, moderna e integrada de forma inteligente ao seu backend.
        </p>

        {/* Bloco de conexão com o Backend */}
        <div className="bg-slate-950/60 rounded-2xl p-4 mb-8 border border-slate-800">
          <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-1.5">
            Status do Backend
          </p>
          
          {carregando ? (
            <div className="flex items-center justify-center gap-2 text-sm text-slate-400 py-1">
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></div>
              <span>Buscando dados da API...</span>
            </div>
          ) : erro ? (
            <p className="text-sm text-red-400 font-medium py-1">
              ⚠️ Erro: {erro}
            </p>
          ) : (
            <p className="text-base font-semibold text-emerald-400 py-1">
              👋 API diz: <span className="text-indigo-300 font-mono">"{dados?.mensagem}"</span>
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <Link to="/login" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3.5 px-4 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-600/30 text-sm">
            Acessar Sistema
          </Link>
          <Link to="/cadastro" className="w-full bg-slate-800/80 hover:bg-slate-800 text-slate-300 font-semibold py-3.5 px-4 rounded-xl border border-slate-700/50 transition-all duration-200 text-sm">
            Criar Conta Gratuita
          </Link>
        </div>

      </div>
    </div>
  );
}
