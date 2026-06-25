import { useEffect, useState } from "react";
import api from "../services/api";

export default function Cursos() {
  const [cursos, setCursos] = useState([]);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    api.get(`cursos/?search=${busca}`).then((res) => setCursos(res.data));
  }, [busca]);

  return (
    <div>
      <h2>Cursos</h2>

      <input placeholder="Buscar curso..." onChange={(e) => setBusca(e.target.value)} />

      <table className="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Sigla</th>
            <th>Código</th>
          </tr>
        </thead>

        <tbody>
          {cursos.map((c) => (
            <tr key={c.id}>
              <td>{c.nome}</td>
              <td>{c.sigla}</td>
              <td>{c.codigo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
