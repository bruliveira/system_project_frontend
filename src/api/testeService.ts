export interface TesteResponse {
  mensagem: string;
}

export const fetchTesteMensagem = async (): Promise<TesteResponse> => {
  // Em produção, usa a URL completa do SEU backend no Render
  const endpoint = import.meta.env.MODE === 'production'
    ? 'https://onrender.com'
    : '/api/Teste';

  const response = await fetch(endpoint);
  
  if (!response.ok) {
    throw new Error('Erro ao buscar dados da API de Teste');
  }
  
  return response.json();
};
