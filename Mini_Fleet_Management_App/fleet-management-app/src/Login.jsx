import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import Admin from "./Admin";

function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [valid, setValid] = useState(false);
    const navigate = useNavigate();
    

    useEffect(()=>{
        const Email = "admin@gmail.com";
        const Password = "admin1234";
        if(email===Email && password=== Password){
            setValid(true);
        }
        else{
            setValid(false);
        }
    },[email,password])

    const handlelogin=(e)=>{
        e.preventDefault();
        if(valid){
            alert("Login success")
            navigate("/admin");
        }
        else{
            alert("Wrong email or password");
        }
    }



    return(
        
        <div>
            <input type="email" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <br/>
            <input type="password" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <br/>
            <button onClick={handlelogin}>Login</button>
        </div>
        
    )
}
export default Login;