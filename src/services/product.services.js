import service from "./config.services"

// en este lugar añadimos todas las rutas llamadas al backend 

const getAllProductService = () =>{

    return service.get("/product")
}

//tipo post 
const addNewProductService = (newProduct) =>{
    return service.post("/product", newProduct)
}

const getProductDetailsService = (id) =>{
    return service.get(`/product/${id}`)
}

const deleteProductService =(id) =>{
    return service.delete(`/product/${id}`)
}

const patchProductService = (id, editProduct) =>{

    return service.patch(`/product/${id}`, editProduct)

}


export{getAllProductService, addNewProductService, getProductDetailsService, deleteProductService, patchProductService}