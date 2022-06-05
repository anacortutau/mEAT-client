import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAllOrderService } from '../../services/order.services'

function OrderList() {

      //1. Estado para la data
      const [allOrder, setAllOrder] = useState(null)
      const [buscando, setBuscando] =useState(true)
  
      const navigate= useNavigate()

      useEffect(()=>{

        getAllOrder()

    }, [])

      //3. La funcion que busca la data

      const getAllOrder = async() =>{

        try{

           const response = await getAllOrderService()
           console.log(response.data)
           setAllOrder(response.data)
           setBuscando(false)


        }catch(error){
            if(error.response.status === 401){
                navigate("/login")
            }

            navigate("/error")
        }


    }

    //4 el loading

    if(buscando === true){
        return <h3>...Loading</h3>
    }

  




  return (
    <div>
    {/* <AddFormProduct getAllProducts= {getAllProducts}/>
    <hr/> */}

    <h3>List Order</h3>

    {allOrder === null && <h3>...Loading</h3>}
    {
        allOrder!== null && allOrder.map((eachOrder)=>{
            return(
                <div key={eachOrder._id}>
                <Link to={`/order/${eachOrder._id}/details`}>
                    {eachOrder.name}{eachOrder.products}{eachOrder.menu}{eachOrder.price}</Link> 
                </div>
            )
        })
    }
</div>
  )
}

export default OrderList