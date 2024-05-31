import React,{useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios"
const Login =()=>{
    const [inputs,setInputs]=useState({
        username:"",
        password:"",
    })
    const [err,setError]=useState(null)

    const navigate = useNavigate()
    const handleChange= e =>{
        setInputs(prev=>({...prev,[e.target.name]:e.target.value}))
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        try{
            async(inputs)=>{
                await axios({
                     method:"post",
                     baseURL:"http://localhost:8800/api/",
                     url:"/auth/login",
                     data:inputs,
                })  
    }         
            navigate("/")
        }catch(err){
            setError(err.response.data);
        }
    }
    return(
        <div className="auth">
            <h1>Login</h1>
                <form>
                    <input required name="username" type="text" placeholder="username" onChange={handleChange}></input>
                    <input required name="password" type="password" placeholder="password" onChange={handleChange}></input>
                    <button onClick={handleSubmit}>Login</button>
                    {err && <p>{err}</p>}
                    <span>Don't you have account? <Link to="/register">Register</Link>
                    </span>
                </form>
        </div>
    )
}
export default Login