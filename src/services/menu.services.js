import service from "./config.services"

// en este lugar añadimos todas las rutas llamadas al backend 

const getAllMenuService = () =>{

    return service.get("/menu")
}

//tipo post 
const addNewMenuService = (newMenu) =>{
    return service.post("/menu", newMenu)
}

const getMenuDetailsService = (id) =>{
    return service.get(`/menu/${id}`)
}

const deleteMenuService =(id) =>{
    return service.delete(`/menu/${id}`)
}

const patchMenuService = (id, editMenu) =>{

    return service.patch(`/menu/${id}`, editMenu)

}


export{getAllMenuService, addNewMenuService, getMenuDetailsService, deleteMenuService, patchMenuService}