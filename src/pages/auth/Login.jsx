import React from 'react'
import { useState, useContext } from "react";
import { loginService, verifyService } from "../../services/auth.services";
import {AuthContext} from "../../context/auth.context.js";
import {NavLink, useNavigate} from "react-router-dom"

function Login() {

    const {authenticateUser} = useContext(AuthContext)

    const navigate = useNavigate()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
  

     const handleEmailChange = (e) => setEmail(e.target.value);
     const handlePasswordChange = (e) => setPassword(e.target.value);
     const handleIsAdmin = (e)=>setIsAdmin(e.target.value);

   
      


    const handleLogin = async (e) => {
        e.preventDefault();
       
        // two items to the backend
    
        const user ={
          email,
          password
        }
    
        try{
    
          //validaremos al usuario
          const response = await loginService(user)
          console.log("usuario validado", response.data)
          //guardamos el token en localStorage
          localStorage.setItem("authToken", response.data.authToken)
          authenticateUser()
          navigate("/")
    
          // asignar los valores a los estados globales para manejo en el Front en context
    
    
        }catch(error){
          console.log(error.response)
    
          if(error.response.status === 400 || error.response.status === 401){
            setErrorMessage(error.response.data.errorMessage)
          }
    
        }
      };

  return (
    <div>

            <h1>Log In</h1>
            
            <section class="form-login">
            <form onSubmit={handleLogin}>
              <br />
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
      <br />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
        {/* <div className="isAdminCkeckBox">
          <label htmlFor="isAdmin">Admin</label>
          <input type="checkbox"  name="isAdmin" checked={isAdmin} onChange={handleIsAdmin}/>
          </div> */}

        {errorMessage !== null && <p>{errorMessage}</p>}

        <button class="home-main-button-login" type="submit">Login</button>
      </form>
      </section>
    </div>
  );
}


export default Login;


 