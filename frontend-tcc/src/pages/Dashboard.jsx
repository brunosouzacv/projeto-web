import { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("tccs/estatisticas/").then((res) => setData(res.data));
  }, []);

  if (!data) return <p>Carregando dashboard...</p>;

  return (
    <div>
      <h2>Dashboard</h2>

      <h4>Total de TCCs: {data.total_geral}</h4>

      <ul>
        {Object.entries(data.por_status).map(([k, v]) => (
          <li key={k}>
            {k}: {v}
          </li>
        ))}
      </ul>
    </div>
  );
}
