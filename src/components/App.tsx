import { BrowserRouter as Router } from "react-router-dom";
import AppContent from "./AppContent";
import './App.scss';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
