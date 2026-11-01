export interface UsuarioSessao {
  id: number;
  nome: string;
  login: string;
  perfil: string;
}

export interface NovoUsuario {
  nome: string;
  login: string;
  senha: string;
  perfil: string;
}

async function lerResposta(response: Response) {
  const body = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(body?.mensagem ?? 'Não foi possível concluir a operação.');
  }
  return body;
}

export const entrar = async (login: string, senha: string): Promise<UsuarioSessao> => {
  const response = await fetch('/api/Usuarios/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ login, senha }),
  });

  return lerResposta(response) as Promise<UsuarioSessao>;
};

export const listarUsuarios = async (): Promise<UsuarioSessao[]> => {
  const response = await fetch('/api/Usuarios');
  return lerResposta(response) as Promise<UsuarioSessao[]>;
};

export const criarUsuario = async (dados: NovoUsuario): Promise<UsuarioSessao> => {
  const response = await fetch('/api/Usuarios', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  });
  return lerResposta(response) as Promise<UsuarioSessao>;
};

export const excluirUsuario = async (id: number): Promise<void> => {
  const response = await fetch(`/api/Usuarios/${id}`, { method: 'DELETE' });
  if (response.status === 204) return;
  await lerResposta(response);
};
