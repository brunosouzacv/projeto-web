import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <h3 style={styles.logo}>TCC System</h3>

      <div style={styles.links}>
        <Link to="/">Dashboard</Link>
        <Link to="/alunos">Alunos</Link>
        <Link to="/professores">Professores</Link>
        <Link to="/cursos">Cursos</Link>
        <Link to="/departamentos">Departamentos</Link>
        <Link to="/unidades">Unidades</Link>
        <Link to="/tccs">TCCs</Link>
        <Link to="/tccs/novo">Novo TCC</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 20px",
    background: "#1f2937",
    color: "white",
  },
  links: {
    display: "flex",
    gap: "15px",
  },
  logo: {
    margin: 0,
  },
};
