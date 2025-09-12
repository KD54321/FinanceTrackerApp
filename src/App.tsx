import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login onLoginSuccess={(user) => console.log("Logged in user:", user)} />} />
    </Routes>
  );
}

export default App;