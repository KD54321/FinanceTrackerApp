import React, { useState } from "react";
import supabase from "../../supabaseClient";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Car } from "lucide-react";
import { Carousel } from "@/components/ui/carousel";
import { Label } from "@/components/ui/label";
import { Separator } from "@radix-ui/react-dropdown-menu";

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
    setLoading(true);
    if(email && password){
      navigate("/");
    }
    //TODO: Implement login logic here
    /*const {data, error} = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    if(error){
        setError(error.message);
    } else {
        onLoginSuccess(data.user);
        navigate("/");
    }*/
    };
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
        {/* Logo or Image */}
        <img src="/cat.avif" alt="Logo" className="absolute inset-0 w-full h-full object-cover opacity-70 z-0 pointer-events-none"/>
      <Card className="w-[350px] z-10">
        <CardHeader>
          <CardTitle className="text-center">Welcome Back!</CardTitle>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="flex flex-col w-full"><Label className="mb-1">Email: </Label>
              <input className="border-2 rounded-lg p-1 w-full" type="email" value={email} onChange={(e)=> setEmail(e.target.value)} required placeholder="example@email.com"></input>
              </div>
              <div className="flex flex-col w-full"><Label className="mb-1">Password: </Label>
              <input className="border-2 rounded-lg p-1 w-full" type="password" value={password} onChange={(e)=> setPassword(e.target.value)} required placeholder ="******"></input>
              </div>
              <Button type="submit" className="w-full">Login</Button>
            </form>
            <Separator className="my-4" />
            <div className="text-sm text-center text-gray-600">
              Don't have an account? <a href="/signup" className="text-blue-600 hover:underline">Sign Up</a>
            </div>
       </CardContent>
        </Card>
        </div>
    )
  };

  
  export default Login;