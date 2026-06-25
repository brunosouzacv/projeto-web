import { useEffect, useState } from "react";
import api from "../services/api";

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    api.get(`alunos/?search=${busca}`).then((res) => setAlunos(res.data));
  }, [busca]);

  return (
    <div>
      <h2>Alunos</h2>

      <input placeholder="Buscar..." onChange={(e) => setBusca(e.target.value)} />

      <table className="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Matrícula</th>
            <th>Curso</th>
          </tr>
        </thead>

        <tbody>
          {alunos.map((a) => (
            <tr key={a.id}>
              <td>{a.nome}</td>
              <td>{a.matricula}</td>
              <td>{a.curso_nome}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
