import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthForm from "./Auth/AuthForm";
import Home from "./Pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
