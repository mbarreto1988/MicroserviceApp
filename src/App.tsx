import { BrowserRouter as Router } from "react-router-dom";
import PagesComponents from "./Pages";
import './App.scss';

function App() {
  return (
    <Router>
      <PagesComponents />
    </Router>
  );
}

export default App;
