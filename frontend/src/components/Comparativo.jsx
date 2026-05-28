export default function Comparativo({ resultadoA, resultadoB }) {
  if (!resultadoA || !resultadoB) return null

  const fmt = valor => valor?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  const diferenca = Math.abs(resultadoA.saldo_final - resultadoB.saldo_final)
  const melhor = resultadoA.saldo_final > resultadoB.saldo_final
    ? '✅ Cálculo A rende mais'
    : resultadoB.saldo_final > resultadoA.saldo_final
    ? '✅ Cálculo B rende mais'
    : '🟰 Ambos rendem igual'

  return (
    <div style={styles.card}>
      <h2 style={styles.titulo}>⚖️ Comparativo A vs B</h2>

      <div style={styles.header}>
        <span style={styles.headerLabel}>MÉTRICA</span>
        <span style={{ ...styles.headerLabel, color: '#C4783A' }}>CÁLCULO A</span>
        <span style={{ ...styles.headerLabel, color: '#2A7A6F' }}>CÁLCULO B</span>
      </div>

      <div style={styles.divider} />

      <div style={styles.row}>
        <span style={styles.rowLabel}>Saldo Final</span>
        <span style={{ ...styles.rowValor, color: '#C4783A' }}>{fmt(resultadoA.saldo_final)}</span>
        <span style={{ ...styles.rowValor, color: '#2A7A6F' }}>{fmt(resultadoB.saldo_final)}</span>
      </div>

      <div style={styles.divider} />

      <div style={styles.row}>
        <span style={styles.rowLabel}>Total Investido</span>
        <span style={{ ...styles.rowValor, color: '#6B7280' }}>{fmt(resultadoA.total_investido)}</span>
        <span style={{ ...styles.rowValor, color: '#6B7280' }}>{fmt(resultadoB.total_investido)}</span>
      </div>

      <div style={styles.divider} />

      <div style={styles.row}>
        <span style={styles.rowLabel}>Juros Ganhos</span>
        <span style={{ ...styles.rowValor, color: '#059669' }}>{fmt(resultadoA.juros_ganhos)}</span>
        <span style={{ ...styles.rowValor, color: '#059669' }}>{fmt(resultadoB.juros_ganhos)}</span>
      </div>

      <div style={styles.destaque}>
        <span style={styles.destaqueLabel}>DIFERENÇA DE SALDO</span>
        <span style={styles.destaqueValor}>{fmt(diferenca)}</span>
        <span style={styles.destaqueMelhor}>{melhor}</span>
      </div>
    </div>
  )
}

const styles = {
  card: { background: '#FFFDF8', border: '2px solid #E8D4B0', borderRadius: '16px', padding: '20px', marginBottom: '12px' },
  titulo: { fontSize: '16px', fontWeight: 'bold', color: '#3D1A00', marginBottom: '16px' },
  header: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', marginBottom: '8px' },
  headerLabel: { fontSize: '11px', fontWeight: 'bold', color: '#8B5E3C', textAlign: 'center' },
  divider: { height: '1px', background: '#E8D4B0', margin: '8px 0' },
  row: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', alignItems: 'center' },
  rowLabel: { fontSize: '13px', fontWeight: 'bold', color: '#3D1A00' },
  rowValor: { fontSize: '13px', fontWeight: 'bold', textAlign: 'center' },
  destaque: { marginTop: '16px', background: '#FFF3E8', border: '1.5px solid #F5C87A', borderRadius: '10px', padding: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' },
  destaqueLabel: { fontSize: '11px', fontWeight: 'bold', color: '#8B5E3C' },
  destaqueValor: { fontSize: '20px', fontWeight: 'bold', color: '#C4783A' },
  destaqueMelhor: { fontSize: '12px', color: '#8B5E3C' }
}