import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-6">
      <div className="max-w-md w-full bg-slate-900 rounded-3xl shadow-xl p-8 border border-slate-800">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Seja bem-vindo de volta</h2>
          <p className="text-slate-400 text-sm">Insira suas credenciais para acessar a plataforma</p>
        </div>
        
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">E-mail</label>
            <input 
              type="email" 
              placeholder="seu@email.com" 
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm" 
            />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Senha</label>
              <a href="#" className="text-xs text-indigo-400 hover:underline">Esqueceu a senha?</a>
            </div>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm" 
            />
          </div>

          <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-indigo-600/20 transition-all text-sm mt-2">
            Entrar no Painel
          </button>
        </form>

        <p className="mt-8 text-sm text-center text-slate-400">
          Ainda não tem uma conta?{' '}
          <Link to="/cadastro" className="text-indigo-400 hover:text-indigo-300 font-semibold hover:underline">
            Cadastre-se aqui
          </Link>
        </p>
      </div>
    </div>
  );
}
