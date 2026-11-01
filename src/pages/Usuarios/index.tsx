import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { criarUsuario, excluirUsuario, listarUsuarios, type UsuarioSessao } from '../../api/usuarios';
import { rotuloPerfil } from '../../components/PainelLayout';
import './usuarios.css';

const porPagina = 5;

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState<UsuarioSessao[]>([]);
  const [busca, setBusca] = useState('');
  const [tipo, setTipo] = useState('todos');
  const [pagina, setPagina] = useState(1);
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [formularioAberto, setFormularioAberto] = useState(false);

  const carregar = async () => {
    setErro(null);
    setCarregando(true);
    try {
      setUsuarios(await listarUsuarios());
    } catch (error) {
      setErro(error instanceof Error ? error.message : 'Não foi possível carregar os usuários.');
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    void carregar();
  }, []);

  const filtrados = useMemo(() => {
    const texto = busca.trim().toLowerCase();
    return usuarios.filter((usuario) => {
      const combinaTipo = tipo === 'todos' || usuario.perfil === tipo;
      const combinaBusca = texto.length === 0
        || usuario.nome.toLowerCase().includes(texto)
        || usuario.login.toLowerCase().includes(texto);
      return combinaTipo && combinaBusca;
    });
  }, [usuarios, busca, tipo]);

  const totalPaginas = Math.max(1, Math.ceil(filtrados.length / porPagina));
  const paginaAtual = Math.min(pagina, totalPaginas);

  useEffect(() => {
    if (pagina > totalPaginas) setPagina(totalPaginas);
  }, [pagina, totalPaginas]);
  const inicio = (paginaAtual - 1) * porPagina;
  const visiveis = filtrados.slice(inicio, inicio + porPagina);

  const remover = async (usuario: UsuarioSessao) => {
    if (!window.confirm(`Excluir ${usuario.nome}?`)) return;
    try {
      await excluirUsuario(usuario.id);
      await carregar();
    } catch (error) {
      setErro(error instanceof Error ? error.message : 'Não foi possível excluir.');
    }
  };

  return (
    <section className="cartao">
      <div className="pagina-titulo">
        <div>
          <h1>Usuários</h1>
          <p>Gerencie os usuários do sistema</p>
        </div>
        <button type="button" className="botao-laranja" onClick={() => setFormularioAberto(true)}>
          + Novo usuário
        </button>
      </div>

      <div className="usuarios-ferramentas">
        <input
          className="usuarios-busca"
          value={busca}
          onChange={(event) => {
            setBusca(event.target.value);
            setPagina(1);
          }}
          placeholder="Buscar por nome, usuário ou e-mail..."
        />
        <select
          value={tipo}
          onChange={(event) => {
            setTipo(event.target.value);
            setPagina(1);
          }}
        >
          <option value="todos">Todos os tipos</option>
          <option value="admin">Administrador</option>
          <option value="atendente">Atendente</option>
        </select>
      </div>

      {erro && <p className="usuarios-aviso">{erro}</p>}
      {carregando ? <p>Carregando usuários...</p> : (
        <table className="usuarios-tabela">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Usuário</th>
              <th>Tipo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {visiveis.map((usuario) => (
              <tr key={usuario.id}>
                <td>
                  <div className="usuario-pessoa">
                    <span className="usuario-iniciais">{iniciais(usuario.nome)}</span>
                    {usuario.nome}
                  </div>
                </td>
                <td>{usuario.login}</td>
                <td>
                  <span className={`tipo ${usuario.perfil}`}>{rotuloPerfil(usuario.perfil)}</span>
                </td>
                <td>
                  <div className="acoes">
                    <button type="button" onClick={() => void remover(usuario)} aria-label={`Excluir ${usuario.nome}`}>
                      🗑
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {visiveis.length === 0 && (
              <tr>
                <td colSpan={4}>Nenhum usuário encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      <div className="usuarios-rodape">
        <span>
          Mostrando {filtrados.length === 0 ? 0 : inicio + 1} a {Math.min(inicio + porPagina, filtrados.length)} de {filtrados.length} usuários
        </span>
        <div className="paginas">
          <button type="button" onClick={() => setPagina((valor) => Math.max(1, valor - 1))} aria-label="Página anterior">‹</button>
          <button type="button" className="ativa">{paginaAtual}</button>
          <button type="button" onClick={() => setPagina((valor) => Math.min(totalPaginas, valor + 1))} aria-label="Próxima página">›</button>
        </div>
      </div>

      {formularioAberto && (
        <NovoUsuario
          onFechar={() => setFormularioAberto(false)}
          onSalvo={async () => {
            setFormularioAberto(false);
            await carregar();
          }}
        />
      )}
    </section>
  );
}

function NovoUsuario({ onFechar, onSalvo }: { onFechar: () => void; onSalvo: () => Promise<void> }) {
  const [nome, setNome] = useState('');
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [perfil, setPerfil] = useState('atendente');
  const [erro, setErro] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  const enviar = async (event: FormEvent) => {
    event.preventDefault();
    setEnviando(true);
    setErro(null);
    try {
      await criarUsuario({ nome: nome.trim(), login: login.trim(), senha, perfil });
      await onSalvo();
    } catch (error) {
      setErro(error instanceof Error ? error.message : 'Não foi possível cadastrar.');
      setEnviando(false);
    }
  };

  return (
    <div className="modal-fundo">
      <form className="usuario-form" onSubmit={enviar}>
        <h2>Novo usuário</h2>
        <label htmlFor="nome">Nome</label>
        <input id="nome" value={nome} onChange={(event) => setNome(event.target.value)} required />
        <label htmlFor="novo-login">Usuário</label>
        <input id="novo-login" value={login} onChange={(event) => setLogin(event.target.value)} required />
        <label htmlFor="nova-senha">Senha</label>
        <input id="nova-senha" type="password" value={senha} onChange={(event) => setSenha(event.target.value)} minLength={6} required />
        <label htmlFor="perfil">Tipo</label>
        <select id="perfil" value={perfil} onChange={(event) => setPerfil(event.target.value)}>
          <option value="atendente">Atendente</option>
          <option value="admin">Administrador</option>
        </select>
        {erro && <p className="usuarios-aviso">{erro}</p>}
        <div className="botoes">
          <button type="button" className="cancelar" onClick={onFechar}>Cancelar</button>
          <button type="submit" className="botao-laranja" disabled={enviando}>
            {enviando ? 'Salvando...' : 'Cadastrar'}
          </button>
        </div>
      </form>
    </div>
  );
}

function iniciais(nome: string) {
  return nome
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0]?.toUpperCase() ?? '')
    .join('');
}
