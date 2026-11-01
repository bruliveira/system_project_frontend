import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PainelLayout from './components/PainelLayout';
import EmBreve from './pages/EmBreve';
import Home from './pages/Home';
import Login from './pages/Login';
import Usuarios from './pages/Usuarios';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PainelLayout />}>
          <Route path="/painel" element={<Home />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/pedidos" element={<EmBreve titulo="Pedidos" />} />
          <Route path="/mesas" element={<EmBreve titulo="Mesas" />} />
          <Route path="/produtos" element={<EmBreve titulo="Produtos" />} />
          <Route path="/relatorios" element={<EmBreve titulo="Relatórios" />} />
          <Route path="/configuracoes" element={<EmBreve titulo="Configurações" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
