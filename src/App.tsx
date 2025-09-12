import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/Login";
import Login1 from "./pages/Login1";
import { Import } from "lucide-react";
function App() {
  return (
    //<Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLoginSuccess={(user) => console.log("Logged in user:", user)} />} />
            <Route path="/login1" element={<Login1 />} />
        </Routes>
      
    //</Suspense>
  );
}

export default App;
