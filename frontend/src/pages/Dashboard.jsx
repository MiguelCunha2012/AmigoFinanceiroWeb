import { useState } from 'react'
import Navbar from '../components/Navbar'
import CalculoForm from '../components/CalculoForm'
import Comparativo from '../components/Comparativo'

export default function Dashboard() {
  const [resultadoA, setResultadoA] = useState(null)
  const [resultadoB, setResultadoB] = useState(null)
  const [comparar, setComparar] = useState(false)

  return (
    <div style={styles.container}>
      <Navbar />

      <div style={styles.content}>
        <CalculoForm
        titulo="📊 Cálculo A"
          cor="#C4783A"
          onResultado={setResultadoA}
        />

        <button
            onClick={() => setComparar(!comparar)}
            style={styles.btnComparar}>

            {comparar ? '🔄 Refazer Cálculos' : '⚖️ Comparar Resultados'}
        </button>

        {comparar && (
          <CalculoForm
            titulo="📊 Cálculo B — Comparação"
            cor="#2A7A6F"
            onResultado={setResultadoB}
          />
        )}

        {comparar && (
            <Comparativo resultadoA={resultadoA} resultadoB={resultadoB} />
        )}
        </div>
    </div>
  )
}
const styles = {
  container: { minHeight: '100vh', background: '#FDF6EC' },
  content: { padding: '16px', maxWidth: '600px', margin: '0 auto' },
  btnComparar: {
    width: '100%',
    background: 'transparent',
    border: '2px solid #C4783A',
    color: '#C4783A',
    borderRadius: '12px',
    padding: '12px',
    fontSize: '15px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginBottom: '12px'
  }
}

