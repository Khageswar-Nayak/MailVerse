import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthForm from "./Auth/AuthForm";
import Home from "./Pages/Home";
import Compose from "./Pages/Compose";
import Sent from "./Pages/Sent";
import SentEmailDetails from "./Components/SentEmailDetails";
import ReceiveEmailDetails from "./Components/ReceiveEmailDetails";
import Trash from "./Pages/Trash";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/compose" element={<Compose />} />
        <Route path="/sent" element={<Sent />} />
        <Route path="/trash" element={<Trash />} />
        <Route path="/sentemaildetails" element={<SentEmailDetails />} />
        <Route path="/receiveEmaildetails" element={<ReceiveEmailDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
