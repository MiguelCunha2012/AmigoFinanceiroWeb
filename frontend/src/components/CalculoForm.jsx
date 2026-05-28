import { useState } from 'react'
import api from '../services/api'

export default function CalculoForm({ titulo, cor, onResultado }) {
  const [principal, setPrincipal] = useState('')
  const [taxa, setTaxa] = useState('')
  const [taxaAnual, setTaxaAnual] = useState(false)
  const [tempo, setTempo] = useState('')
  const [emAnos, setEmAnos] = useState(false)
  const [aporte, setAporte] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)
  const [resultado, setResultado] = useState(null)

  async function handleCalcular(e) {
    e.preventDefault()
    setErro('')
    setCarregando(true)
    try {
      const res = await api.post('/calculos', {
        principal: parseFloat(principal),
        taxa: parseFloat(taxa),
        taxa_anual: taxaAnual,
        tempo: parseInt(tempo),
        em_anos: emAnos,
        aporte_mensal: parseFloat(aporte || 0)
      })
      setResultado(res.data)
      onResultado(res.data)
    } catch (err) {
      setErro(err.response?.data?.detail || 'Erro ao calcular')
    } finally {
      setCarregando(false)
    }
  }

  const fmt = valor => valor?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  return (
    <div style={{ ...styles.card, borderColor: cor }}>
      <h2 style={{ ...styles.titulo, color: cor }}>{titulo}</h2>

      {erro && <div style={styles.erro}>{erro}</div>}

      <form onSubmit={handleCalcular} style={styles.form}>

        <label style={styles.label}>VALOR INICIAL (R$)</label>
        <input
          type="number"
          value={principal}
          onChange={e => setPrincipal(e.target.value)}
          style={styles.input}
          placeholder="0,00"
          required
        />

        <label style={styles.label}>APORTE MENSAL (R$)</label>
        <input
          type="number"
          value={aporte}
          onChange={e => setAporte(e.target.value)}
          style={styles.input}
          placeholder="0,00"
        />

        <label style={styles.label}>TAXA DE JUROS (%)</label>
        <div style={styles.inputGroup}>
          <input
            type="number"
            value={taxa}
            onChange={e => setTaxa(e.target.value)}
            style={{ ...styles.input, flex: 1 }}
            placeholder="0,00"
            required
          />
          <div style={styles.radioGroup}>
            <label style={styles.radioLabel}>
              <input type="radio" checked={!taxaAnual} onChange={() => setTaxaAnual(false)} />
              Mensal
            </label>
            <label style={styles.radioLabel}>
              <input type="radio" checked={taxaAnual} onChange={() => setTaxaAnual(true)} />
              Anual
            </label>
          </div>
        </div>

        <label style={styles.label}>TEMPO</label>
        <div style={styles.inputGroup}>
          <input
            type="number"
            value={tempo}
            onChange={e => setTempo(e.target.value)}
            style={{ ...styles.input, flex: 1 }}
            placeholder="0"
            required
          />
          <div style={styles.radioGroup}>
            <label style={styles.radioLabel}>
              <input type="radio" checked={!emAnos} onChange={() => setEmAnos(false)} />
              Meses
            </label>
            <label style={styles.radioLabel}>
              <input type="radio" checked={emAnos} onChange={() => setEmAnos(true)} />
              Anos
            </label>
          </div>
        </div>

        <button type="submit" style={{ ...styles.botao, background: cor }} disabled={carregando}>
          {carregando ? 'Calculando...' : `Calcular`}
        </button>
      </form>

      {resultado && (
        <div style={styles.resultado}>
          <div style={styles.resultadoItem}>
            <span style={styles.resultadoLabel}>SALDO FINAL</span>
            <span style={{ ...styles.resultadoValor, color: cor }}>{fmt(resultado.saldo_final)}</span>
          </div>
          <div style={styles.resultadoItem}>
            <span style={styles.resultadoLabel}>TOTAL INVESTIDO</span>
            <span style={{ ...styles.resultadoValor, color: '#6B7280' }}>{fmt(resultado.total_investido)}</span>
          </div>
          <div style={styles.resultadoItem}>
            <span style={styles.resultadoLabel}>JUROS GANHOS</span>
            <span style={{ ...styles.resultadoValor, color: '#059669' }}>{fmt(resultado.juros_ganhos)}</span>
          </div>
        </div>
      )}
    </div>
  )
}

const styles = {
  card: {
    background: '#FFFDF8',
    border: '2px solid',
    borderRadius: '16px',
    padding: '20px',
    marginBottom: '12px'
  },
  titulo: { fontSize: '16px', fontWeight: 'bold', marginBottom: '16px' },
  erro: { background: '#FEE2E2', border: '1px solid #FECACA', color: '#991B1B', padding: '10px', borderRadius: '8px', marginBottom: '12px', fontSize: '14px' },
  form: { display: 'flex', flexDirection: 'column', gap: '4px' },
  label: { color: '#8B5E3C', fontSize: '11px', fontWeight: 'bold', marginTop: '8px' },
  input: { padding: '10px', borderRadius: '8px', border: '1.5px solid #E8D4B0', fontSize: '16px', background: '#FFF8EE', color: '#3D1A00', width: '100%', boxSizing: 'border-box' },
  inputGroup: { display: 'flex', gap: '8px', alignItems: 'center' },
  radioGroup: { display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '70px' },
  radioLabel: { display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#3D1A00', cursor: 'pointer' },
  botao: { color: 'white', border: 'none', borderRadius: '12px', padding: '14px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '12px' },
  resultado: { marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid #E8D4B0', paddingTop: '16px' },
  resultadoItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  resultadoLabel: { color: '#8B5E3C', fontSize: '11px', fontWeight: 'bold' },
  resultadoValor: { fontSize: '16px', fontWeight: 'bold' }
}