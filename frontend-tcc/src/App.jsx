import { BrowserRouter } from "react-router-dom";
import RoutesApp from "./routes";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="container mt-3">
        <RoutesApp />
      </div>
    </BrowserRouter>
  );
}

export default App;
