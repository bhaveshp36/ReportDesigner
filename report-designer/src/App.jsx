import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LayoutPage from "./pages/LayoutPage"; // Assuming LayoutPage is in the same directory
import ReportPage from "./pages/ReportPage"; // Assuming ReportPage is in the same directory

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LayoutPage />} />
        <Route path="/report/:steamid" element={<ReportPage />} />
      </Routes>
    </Router>
  );
}

export default App;
