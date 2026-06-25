import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Alunos from "./pages/Alunos";
import Professores from "./pages/Professores";
import Cursos from "./pages/Cursos";
import Departamentos from "./pages/Departamentos";
import Unidades from "./pages/Unidades";
import TCCs from "./pages/TCCs";
import NovoTCC from "./pages/NovoTCC";

export default function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/alunos" element={<Alunos />} />
      <Route path="/professores" element={<Professores />} />
      <Route path="/cursos" element={<Cursos />} />
      <Route path="/departamentos" element={<Departamentos />} />
      <Route path="/unidades" element={<Unidades />} />
      <Route path="/tccs" element={<TCCs />} />
      <Route path="/tccs/novo" element={<NovoTCC />} />
    </Routes>
  );
}

/*export default function RoutesApp() {
  return <h1>ROUTES OK</h1>;
}*/
