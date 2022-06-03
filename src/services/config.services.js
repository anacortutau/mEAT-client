import axios from "axios";

//forma organizada de lo que seran las llamadas al backend

const service= axios.create({
    baseURL: "http://localhost:5005/api"
})

// es donde hacemos codigo magia donde el token sera enviado al backend
service.interceptors.request.use((config)=>{

    //buscar el token en localStorage
    const authToken = localStorage.getItem("authToken")

    if(authToken){
        config.headers = {authorization: `Bearer ${authToken}`}
    }

    return config

})




export default service