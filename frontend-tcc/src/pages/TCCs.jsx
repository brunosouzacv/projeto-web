import { useEffect, useState } from "react";
import api from "../services/api";

export default function TCCs() {
  const [tccs, setTccs] = useState([]);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    carregar();
  }, [busca]);

  function carregar() {
    api.get(`tccs/?search=${busca}`).then((res) => setTccs(res.data));
  }

  async function mudarStatus(id, novoStatus) {
    await api.patch(`tccs/${id}/`, { status: novoStatus });
    carregar();
  }

  return (
    <div>
      <h2>TCCs</h2>

      <input
        className="form-control mb-3"
        placeholder="Buscar por título ou resumo..."
        onChange={(e) => setBusca(e.target.value)}
      />

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Título</th>
            <th>Aluno</th>
            <th>Orientador</th>
            <th>Tipo</th>
            <th>Semestre</th>
            <th>Status</th>
            <th>Arquivo</th>
            <th>Alterar Status</th>
          </tr>
        </thead>

        <tbody>
          {tccs.map((t) => (
            <tr key={t.id}>
              <td>{t.titulo}</td>
              <td>{t.aluno_nome}</td>
              <td>{t.orientador_nome}</td>
              <td>{t.tipo_display}</td>
              <td>{t.semestre_letivo_defesa || "-"}</td>
              <td>{t.status_display}</td>
              <td>
                {t.arquivo && (
                  <a href={t.arquivo} target="_blank" rel="noreferrer">
                    PDF
                  </a>
                )}
              </td>
              <td>
                <select
                  className="form-select form-select-sm"
                  value={t.status}
                  onChange={(e) => mudarStatus(t.id, e.target.value)}
                >
                  <option value="0">Em Elaboração</option>
                  <option value="1">Enviado</option>
                  <option value="2">Aprovado</option>
                  <option value="3">Reprovado</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
