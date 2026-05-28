import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login';
import Registro from './pages/Registro';
import Dashboard from './pages/Dashboard';

function RotasProtegidas({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Login />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route
          path="/dashboard"
          element={
            <RotasProtegidas>
              <Dashboard />
            </RotasProtegidas>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}