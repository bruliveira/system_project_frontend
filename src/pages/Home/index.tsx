import { Link } from 'react-router-dom';

export default function Home() {
  const salvo = sessionStorage.getItem('usuario');
  const nome = salvo ? (JSON.parse(salvo) as { nome: string }).nome : '';

  return (
    <section className="cartao">
      <div className="pagina-titulo">
        <div>
          <h1>Início</h1>
          <p>Bem-vindo, {nome}. Este é o painel do balneário.</p>
        </div>
      </div>
      <div className="atalhos">
        <Link className="atalho" to="/usuarios">
          Usuários
          <small>Cadastro de quem acessa o sistema</small>
        </Link>
        <Link className="atalho" to="/pedidos">
          Pedidos
          <small>Em breve</small>
        </Link>
        <Link className="atalho" to="/mesas">
          Mesas
          <small>Em breve</small>
        </Link>
      </div>
    </section>
  );
}
