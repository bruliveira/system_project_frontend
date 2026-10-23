export interface TesteResponse {
  mensagem: string;
}

export const fetchTesteMensagem = async (): Promise<TesteResponse> => {
  const response = await fetch('/api/Teste');
  
  if (!response.ok) {
    throw new Error('Erro ao buscar dados da API de Teste');
  }
  
  return response.json();
};
