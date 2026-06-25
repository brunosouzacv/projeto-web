// src/pages/NovoTCC.jsx
import { useState } from "react";
import api from "../services/api";

export default function NovoTCC() {
  const [titulo, setTitulo] = useState("");
  const [resumo, setResumo] = useState("");
  const [tipo, setTipo] = useState("ARTIGO");
  const [idioma, setIdioma] = useState("PT");
  const [status, setStatus] = useState("0");
  const [arquivo, setArquivo] = useState(null);

  async function salvar(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("titulo", titulo);
    formData.append("resumo", resumo);
    formData.append("tipo", tipo);
    formData.append("idioma", idioma);
    formData.append("status", status);

    if (arquivo) {
      formData.append("arquivo", arquivo);
    }

    await api.post("tccs/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    alert("TCC cadastrado com sucesso!");
  }

  return (
    <div>
      <h2>Novo TCC</h2>

      <form onSubmit={salvar}>
        <input placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} />

        <br />

        <textarea placeholder="Resumo" value={resumo} onChange={(e) => setResumo(e.target.value)} />

        <br />

        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="ARTIGO">Artigo</option>
          <option value="MONOGRAFIA">Monografia</option>
          <option value="RELATORIO_ESTAGIO">Relatório de Estágio</option>
          <option value="RELATORIO_TECNICO">Relatório Técnico</option>
        </select>

        <br />

        <select value={idioma} onChange={(e) => setIdioma(e.target.value)}>
          <option value="PT">Português</option>
          <option value="EN">Inglês</option>
        </select>

        <br />

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="0">Em Elaboração</option>
          <option value="1">Enviado</option>
          <option value="2">Aprovado</option>
          <option value="3">Reprovado</option>
        </select>

        <br />

        <input type="file" accept="application/pdf" onChange={(e) => setArquivo(e.target.files[0])} />

        <br />

        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}
