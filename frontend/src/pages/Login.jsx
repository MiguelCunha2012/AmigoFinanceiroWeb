import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../services/api'

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setErro('')
    setCarregando(true)
    try {
      const res = await api.post('/auth/login', { email, senha })
      localStorage.setItem('token', res.data.access_token)
      navigate('/dashboard')
    } catch (err) {
      setErro(err.response?.data?.detail || 'Erro ao fazer login')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.titulo}>💰 Amigo Financeiro</h1>
        <h2 style={styles.subtitulo}>Entrar na conta</h2>

        {erro && <div style={styles.erro}>{erro}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={styles.input}
            placeholder="seu@email.com"
            required
          />

          <label style={styles.label}>Senha</label>
          <input
            type="password"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            style={styles.input}
            placeholder="Mínimo 8 caracteres"
            required
          />

          <button type="submit" style={styles.botao} disabled={carregando}>
            {carregando ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p style={styles.link}>
          Não tem conta?{' '}
          <Link to="/registro" style={styles.linkTexto}>Criar conta</Link>
        </p>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#FDF6EC',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px'
  },
  card: {
    background: '#FFFDF8',
    border: '2px solid #E8D4B0',
    borderRadius: '16px',
    padding: '32px',
    width: '100%',
    maxWidth: '400px'
  },
  titulo: {
    color: '#C4783A',
    textAlign: 'center',
    marginBottom: '4px',
    fontSize: '24px'
  },
  subtitulo: {
    color: '#3D1A00',
    textAlign: 'center',
    marginBottom: '24px',
    fontSize: '18px',
    fontWeight: 'normal'
  },
  erro: {
    background: '#FEE2E2',
    border: '1px solid #FECACA',
    color: '#991B1B',
    padding: '10px',
    borderRadius: '8px',
    marginBottom: '16px',
    fontSize: '14px'
  },
  form: { display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { color: '#8B5E3C', fontSize: '12px', fontWeight: 'bold' },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1.5px solid #E8D4B0',
    fontSize: '16px',
    background: '#FFF8EE',
    color: '#3D1A00',
    marginBottom: '8px'
  },
  botao: {
    background: '#C4783A',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    padding: '14px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '8px'
  },
  link: { textAlign: 'center', marginTop: '16px', color: '#8B5E3C' },
  linkTexto: { color: '#C4783A', fontWeight: 'bold' }
}