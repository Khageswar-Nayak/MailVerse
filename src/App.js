import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthForm from "./Auth/AuthForm";
import Home from "./Pages/Home";
import Compose from "./Pages/Compose";
import Sent from "./Pages/Sent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/compose" element={<Compose />} />
        <Route path="/sent" element={<Sent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
