import { useState, useEffect } from 'react';
import { fetchTesteMensagem, type TesteResponse } from '../api/testeService';

export function useTeste() {
  const [dados, setDados] = useState<TesteResponse | null>(null);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    fetchTesteMensagem()
      .then((data) => {
        setDados(data);
      })
      .catch((err) => {
        setErro(err.message || 'Erro desconhecido');
      })
      .finally(() => {
        setCarregando(false);
      });
  }, []); 

  return { dados, carregando, erro };
}
