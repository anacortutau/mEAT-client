import {createContext, useEffect, useState} from "react"
import { verifyService } from "../services/auth.services"

const AuthContext = createContext()

function AuthWrapper (props) {


    //todos los estados y funciones 

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)


    const authenticateUser = async () =>{
        setIsLoading(true)

        try{
            //donde llamaremos a la ruta verify
            const response = await verifyService()
            console.log("Token valido")
            console.log("el payload es:", response.data)
            setIsLoggedIn(true)
            setUser(response.data)
            setIsLoading(false)
        }catch(error){
            setIsLoggedIn(false)
            setUser(null)
            setIsLoading(false)
        }
    }

    const passedContext = {
        isLoggedIn,
        user,
        authenticateUser
    }

    useEffect(()=>{
        authenticateUser()
    },[])

    //espera mientras verificamos al usuario antes de renderizar a la app
    if(isLoading === true){
        return <div className="App"><h3>Verificando usuario</h3></div>
    }

    // esto es toda nuestra aplicacion
    return (
        <AuthContext.Provider value = {passedContext}>
            {props.children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthWrapper}



