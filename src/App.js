import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ReservationForm from "./components/ReservationForm";
import ResultPage from "./components/ResultPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reserver" element={<ReservationForm />} />
        <Route path="/resultat" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}

export default App;
