export interface TesteResponse {
  mensagem: string;
}

export const fetchTesteMensagem = async (): Promise<TesteResponse> => {
  const endpoint = import.meta.env.VITE_API_URL 
    ? `${import.meta.env.VITE_API_URL}/api/Teste` 
    : '/api/Teste';

  const response = await fetch(endpoint);
  
  if (!response.ok) {
    throw new Error('Erro ao buscar dados da API de Teste');
  }
  
  return response.json();
};
