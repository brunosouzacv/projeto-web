// src/pages/NovoTCC.jsx
import { useState, useEffect } from "react";
import api from "../services/api";

const SEMESTRES = [
  "2020/1","2020/2","2021/1","2021/2","2022/1","2022/2",
  "2023/1","2023/2","2024/1","2024/2","2025/1","2025/2",
  "2026/1","2026/2",
];

export default function NovoTCC() {
  const [titulo, setTitulo] = useState("");
  const [resumo, setResumo] = useState("");
  const [palavrasChave, setPalavrasChave] = useState("");
  const [tipo, setTipo] = useState("ARTIGO");
  const [idioma, setIdioma] = useState("PT");
  const [status, setStatus] = useState("0");
  const [semestreLetivo, setSemestreLetivo] = useState("");
  const [arquivo, setArquivo] = useState(null);

  const [alunoId, setAlunoId] = useState("");
  const [orientadorId, setOrientadorId] = useState("");
  const [coorientadorId, setCoorientadorId] = useState("");
  const [presidenteId, setPresidenteId] = useState("");
  const [primeiroMembroId, setPrimeiroMembroId] = useState("");
  const [segundoMembroId, setSegundoMembroId] = useState("");

  const [alunos, setAlunos] = useState([]);
  const [professores, setProfessores] = useState([]);

  useEffect(() => {
    api.get("alunos/").then((res) => setAlunos(res.data));
    api.get("professores/").then((res) => setProfessores(res.data));
  }, []);

  async function salvar(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("resumo", resumo);
    formData.append("palavras_chave", palavrasChave);
    formData.append("tipo", tipo);
    formData.append("idioma", idioma);
    formData.append("status", status);
    formData.append("aluno", alunoId);
    formData.append("orientador", orientadorId);
    formData.append("presidente", presidenteId);
    formData.append("primeiro_membro", primeiroMembroId);
    formData.append("segundo_membro", segundoMembroId);
    if (coorientadorId) formData.append("coorientador", coorientadorId);
    if (semestreLetivo) formData.append("semestre_letivo_defesa", semestreLetivo);
    if (arquivo) formData.append("arquivo", arquivo);

    try {
      await api.post("tccs/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("TCC cadastrado com sucesso!");
      setTitulo(""); setResumo(""); setPalavrasChave("");
      setTipo("ARTIGO"); setIdioma("PT"); setStatus("0"); setSemestreLetivo("");
      setArquivo(null); setAlunoId(""); setOrientadorId(""); setCoorientadorId("");
      setPresidenteId(""); setPrimeiroMembroId(""); setSegundoMembroId("");
    } catch (err) {
      alert("Erro ao cadastrar TCC. Verifique os campos e tente novamente.");
      console.error(err.response?.data);
    }
  }

  return (
    <div>
      <h2>Novo TCC</h2>

      <form onSubmit={salvar}>
        <div className="mb-3">
          <label className="form-label">Título *</label>
          <input className="form-control" required value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        </div>

        <div className="mb-3">
          <label className="form-label">Resumo *</label>
          <textarea className="form-control" required rows={4} value={resumo} onChange={(e) => setResumo(e.target.value)} />
        </div>

        <div className="mb-3">
          <label className="form-label">Palavras-chave *</label>
          <input className="form-control" required placeholder="Ex: machine learning, redes neurais" value={palavrasChave} onChange={(e) => setPalavrasChave(e.target.value)} />
        </div>

        <div className="row">
          <div className="col mb-3">
            <label className="form-label">Tipo *</label>
            <select className="form-select" value={tipo} onChange={(e) => setTipo(e.target.value)}>
              <option value="ARTIGO">Artigo</option>
              <option value="MONOGRAFIA">Monografia</option>
              <option value="RELATORIO_ESTAGIO">Relatório de Estágio</option>
              <option value="RELATORIO_TECNICO">Relatório Técnico</option>
            </select>
          </div>

          <div className="col mb-3">
            <label className="form-label">Idioma *</label>
            <select className="form-select" value={idioma} onChange={(e) => setIdioma(e.target.value)}>
              <option value="PT">Português</option>
              <option value="EN">Inglês</option>
            </select>
          </div>

          <div className="col mb-3">
            <label className="form-label">Status</label>
            <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="0">Em Elaboração</option>
              <option value="1">Enviado</option>
              <option value="2">Aprovado</option>
              <option value="3">Reprovado</option>
            </select>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Aluno *</label>
          <select className="form-select" required value={alunoId} onChange={(e) => setAlunoId(e.target.value)}>
            <option value="">Selecione um aluno...</option>
            {alunos.map((a) => (
              <option key={a.id} value={a.id}>{a.nome} — {a.matricula}</option>
            ))}
          </select>
        </div>

        <div className="row">
          <div className="col mb-3">
            <label className="form-label">Orientador *</label>
            <select className="form-select" required value={orientadorId} onChange={(e) => setOrientadorId(e.target.value)}>
              <option value="">Selecione...</option>
              {professores.map((p) => (
                <option key={p.id} value={p.id}>{p.nome}</option>
              ))}
            </select>
          </div>

          <div className="col mb-3">
            <label className="form-label">Coorientador (opcional)</label>
            <select className="form-select" value={coorientadorId} onChange={(e) => setCoorientadorId(e.target.value)}>
              <option value="">Nenhum</option>
              {professores.map((p) => (
                <option key={p.id} value={p.id}>{p.nome}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col mb-3">
            <label className="form-label">Presidente da Banca *</label>
            <select className="form-select" required value={presidenteId} onChange={(e) => setPresidenteId(e.target.value)}>
              <option value="">Selecione...</option>
              {professores.map((p) => (
                <option key={p.id} value={p.id}>{p.nome}</option>
              ))}
            </select>
          </div>

          <div className="col mb-3">
            <label className="form-label">1º Membro da Banca *</label>
            <select className="form-select" required value={primeiroMembroId} onChange={(e) => setPrimeiroMembroId(e.target.value)}>
              <option value="">Selecione...</option>
              {professores.map((p) => (
                <option key={p.id} value={p.id}>{p.nome}</option>
              ))}
            </select>
          </div>

          <div className="col mb-3">
            <label className="form-label">2º Membro da Banca *</label>
            <select className="form-select" required value={segundoMembroId} onChange={(e) => setSegundoMembroId(e.target.value)}>
              <option value="">Selecione...</option>
              {professores.map((p) => (
                <option key={p.id} value={p.id}>{p.nome}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col mb-3">
            <label className="form-label">Semestre de Defesa</label>
            <select className="form-select" value={semestreLetivo} onChange={(e) => setSemestreLetivo(e.target.value)}>
              <option value="">Selecione...</option>
              {SEMESTRES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="col mb-3">
            <label className="form-label">Arquivo (PDF)</label>
            <input className="form-control" type="file" accept="application/pdf" onChange={(e) => setArquivo(e.target.files[0])} />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Salvar TCC</button>
      </form>
    </div>
  );
}
