import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthForm from "./Auth/AuthForm";
import Home from "./Pages/Home";
import Compose from "./Pages/Compose";
import Sent from "./Pages/Sent";
import SentEmailDetails from "./Components/SentEmailDetails";
import ReceiveEmailDetails from "./Components/ReceiveEmailDetails";
import Trash from "./Pages/Trash";
import ErrorPage from "./Pages/ErrorPage";
import { useSelector } from "react-redux";

function App() {
  const email = useSelector((state) => state.auth.email);
  // const idToken = localStorage.getItem("idToken");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/home" element={!email ? <ErrorPage /> : <Home />} />
        <Route path="/compose" element={!email ? <ErrorPage /> : <Compose />} />
        <Route path="/sent" element={!email ? <ErrorPage /> : <Sent />} />
        <Route path="/trash" element={!email ? <ErrorPage /> : <Trash />} />
        <Route
          path="/sentemaildetails"
          element={!email ? <ErrorPage /> : <SentEmailDetails />}
        />
        <Route
          path="/receiveEmaildetails"
          element={!email ? <ErrorPage /> : <ReceiveEmailDetails />}
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
