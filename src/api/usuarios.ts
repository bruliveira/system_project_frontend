export interface UsuarioSessao {
  id: number;
  nome: string;
  login: string;
  perfil: string;
}

export const entrar = async (login: string, senha: string): Promise<UsuarioSessao> => {
  const response = await fetch('/api/Usuarios/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ login, senha }),
  });

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(body?.mensagem ?? 'Não foi possível entrar.');
  }

  return body as UsuarioSessao;
};
