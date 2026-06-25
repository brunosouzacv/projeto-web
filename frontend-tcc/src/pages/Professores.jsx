api.get(`professores/?search=${busca}`);
import { useEffect, useState } from "react";
import api from "../services/api";

export default function Professores() {
  const [professores, setProfessores] = useState([]);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    api.get(`professores/?search=${busca}`).then((res) => setProfessores(res.data));
  }, [busca]);

  return (
    <div>
      <h2>Professores</h2>

      <input placeholder="Buscar professor..." onChange={(e) => setBusca(e.target.value)} />

      <table className="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Departamento</th>
          </tr>
        </thead>

        <tbody>
          {professores.map((p) => (
            <tr key={p.id}>
              <td>{p.nome}</td>
              <td>{p.departamento}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
