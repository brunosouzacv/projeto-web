import { useEffect, useState } from "react";
import api from "../services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const CORES = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#a855f7", "#ec4899"];

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("tccs/estatisticas/").then((res) => setData(res.data));
  }, []);

  if (!data) return <p>Carregando dashboard...</p>;

  const statusData = Object.entries(data.por_status).map(([name, value]) => ({ name, value }));
  const tipoData = Object.entries(data.por_tipo).map(([name, value]) => ({ name, value }));
  const semestreData = Object.entries(data.por_semestre).map(([name, value]) => ({ name, value }));
  const orientadorData = Object.entries(data.por_orientador)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);
  const cursoData = Object.entries(data.por_curso).map(([name, value]) => ({ name, value }));

  return (
    <div>
      <h2>Dashboard</h2>

      <div className="row mb-4">
        <div className="col">
          <div className="card text-center p-3 bg-primary text-white">
            <h6>Total de TCCs</h6>
            <h2>{data.total_geral}</h2>
          </div>
        </div>
        {statusData.map((s) => (
          <div className="col" key={s.name}>
            <div className="card text-center p-3">
              <h6>{s.name}</h6>
              <h3>{s.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="row mb-4">
        <div className="col-md-5">
          <h5>TCCs por Tipo</h5>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={tipoData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {tipoData.map((_, i) => (
                  <Cell key={i} fill={CORES[i % CORES.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="col-md-7">
          <h5>TCCs por Curso</h5>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={cursoData} layout="vertical">
              <XAxis type="number" allowDecimals={false} />
              <YAxis type="category" dataKey="name" width={170} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="value" fill="#0088FE" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-12">
          <h5>TCCs por Semestre</h5>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={semestreData}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-12">
          <h5>TCCs por Orientador (Top 8)</h5>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={orientadorData} layout="vertical">
              <XAxis type="number" allowDecimals={false} />
              <YAxis type="category" dataKey="name" width={190} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="value" fill="#FFBB28" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
