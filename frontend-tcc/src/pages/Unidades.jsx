import { useEffect, useState } from "react";
import api from "../services/api";

export default function Unidades() {
  const [unidades, setUnidades] = useState([]);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    api.get(`unidades-academicas/?search=${busca}`).then((res) => setUnidades(res.data));
  }, [busca]);

  return (
    <div>
      <h2>Unidades Acadêmicas</h2>

      <input placeholder="Buscar unidade..." onChange={(e) => setBusca(e.target.value)} />

      <table className="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Sigla</th>
          </tr>
        </thead>

        <tbody>
          {unidades.map((u) => (
            <tr key={u.id}>
              <td>{u.nome}</td>
              <td>{u.sigla}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
