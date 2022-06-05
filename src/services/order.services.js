import service from "./config.services"

// en este lugar añadimos todas las rutas llamadas al backend 

const getAllOrderService = () =>{

    return service.get("/order")
}

const getOrderDetailsService = (id) =>{
    return service.get(`/order/${id}`)
}

const deleteOrderService =(id) =>{
    return service.delete(`/order/${id}`)
}

const patchOrderService = (id, editOrder) =>{

    return service.patch(`/order/${id}`, editOrder)

}


export{getAllOrderService, getOrderDetailsService, deleteOrderService, patchOrderService}