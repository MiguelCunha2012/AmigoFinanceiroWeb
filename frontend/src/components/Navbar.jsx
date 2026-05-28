import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <nav style={styles.navbar}>
            <h1 style={styles.logo}>💰Amigo Financeiro</h1>
            <button onClick={handleLogout} style={styles.botao}>Sair</button>
        </nav>
    );
}
const styles = {
  nav: {
    background: '#C4783A',
    padding: '12px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  titulo: { color: 'white', fontWeight: 'bold', fontSize: '18px' },
  botao: {
    background: 'transparent',
    border: '2px solid white',
    color: 'white',
    padding: '6px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold'
  }
}

