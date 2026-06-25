export default function Search({ valor, setValor }) {
  return <input className="form-control mb-3" placeholder="Pesquisar..." value={valor} onChange={(e) => setValor(e.target.value)} />;
}
