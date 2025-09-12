import React, { useState } from "react";
import supabase from "../../supabaseClient";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  onLoginSuccess?: (user:any) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async (e: React.FormEvent) =>{
    e.preventDefault();
    const {data, error} = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    if(error){
        setError(error.message);
    } else {
        onLoginSuccess(data.user);
        navigate("/");
    }
    };
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <div><label>Email: </label>
              <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} required></input>
              </div>
              <div><label>Password: </label>
              <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} required></input>
              </div>
              <button type="submit">Login</button>
            </form>
        </div>
    )
  };

  
  export default Login;