import { useEffect, useState } from "react";
import api from "../services/api";

export default function TCCs() {
  const [tccs, setTccs] = useState([]);

  useEffect(() => {
    carregar();
  }, []);

  function carregar() {
    api.get("tccs/").then((res) => setTccs(res.data));
  }

  async function mudarStatus(id, status) {
    const tcc = tccs.find((t) => t.id === id);

    await api.put(`tccs/${id}/`, {
      ...tcc,
      status,
    });

    carregar();
  }

  return (
    <div>
      <h2>TCCs</h2>

      <table className="table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Status</th>
            <th>Arquivo</th>
            <th>Ação</th>
          </tr>
        </thead>

        <tbody>
          {tccs.map((t) => (
            <tr key={t.id}>
              <td>{t.titulo}</td>

              <td>{t.status_display}</td>

              <td>
                {t.arquivo && (
                  <a href={t.arquivo} target="_blank">
                    PDF
                  </a>
                )}
              </td>

              <td>
                <select value={t.status} onChange={(e) => mudarStatus(t.id, e.target.value)}>
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
