import { useEffect, useState } from 'react'

export default function App() {
  const [mensagem, setMensagem] = useState<string>('Carregando conexão com a API...')
  const [erro, setErro] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/Teste')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao falar com o servidor backend através do Proxy.')
        }
        return response.json()
      })
      .then((data) => {
        setMensagem(data.mensagem || JSON.stringify(data))
      })
      .catch((err) => {
        console.error(err)
        setErro('Não foi possível conectar. Certifique-se de reiniciar o servidor do Vite após mudar a config!')
      })
  }, []) 

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontFamily: 'sans-serif',
      backgroundColor: '#f9fafb',
      color: '#1f2937'
    }}>
      <div style={{
        padding: '24px',
        borderRadius: '8px',
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '24px', marginBottom: '16px' }}>Status do Sistema</h1>
        
        {erro ? (
          <div style={{ textAlign: 'left', maxWidth: '400px' }}>
            <p style={{ color: '#ef4444', fontWeight: 'bold' }}>⚠️ Erro de Conexão:</p>
            <p style={{ fontSize: '14px', color: '#4b5563' }}>{erro}</p>
          </div>
        ) : (
          <p style={{ fontSize: '18px', color: '#10b981', fontWeight: '500' }}>
            Resposta da API: <span style={{ color: '#2563eb' }}>{mensagem}</span>
          </p>
        )}
      </div>
    </div>
  )
}
