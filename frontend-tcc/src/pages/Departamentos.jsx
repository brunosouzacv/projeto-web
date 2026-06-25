import { useEffect, useState } from "react";
import api from "../services/api";

export default function Departamentos() {
  const [deps, setDeps] = useState([]);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    api.get(`departamentos/?search=${busca}`).then((res) => setDeps(res.data));
  }, [busca]);

  return (
    <div>
      <h2>Departamentos</h2>

      <input placeholder="Buscar..." onChange={(e) => setBusca(e.target.value)} />

      <table className="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Sigla</th>
            <th>Unidade</th>
          </tr>
        </thead>

        <tbody>
          {deps.map((d) => (
            <tr key={d.id}>
              <td>{d.nome}</td>
              <td>{d.sigla}</td>
              <td>{d.unidade_academica_nome}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
