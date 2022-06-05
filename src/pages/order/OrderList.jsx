import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAllOrderService } from '../../services/order.services'

function OrderList() {

      //1. Estado para la data
      const [allOrder, setAllOrder] = useState(null)
      const [buscando, setBuscando] =useState(true)

      const [name, setName] =useState(null)
      const[number, setNumber] = useState(0)

      const handleNameChange = (e)=>setName(e.target.value)
      const handleNumberChange = (e)=>setNumber(e.target.value)
  
      const navigate= useNavigate()

   
      const handleSubmitDelete= async(e)=>{
          e.preventDefault()
          navigate("/")
      }

      const handleSubmitTake = async(e) =>{
          e.preventDefault()
          navigate("/take")
      }

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

    <h3>Take Home</h3>

    {allOrder === null && <h3>...Loading</h3>}
    {
        allOrder!== null && allOrder.map((eachOrder)=>{
            return(
                <div key={eachOrder._id}>
                <Link to={`/order/${eachOrder._id}/details`}>
                    {eachOrder.name}{eachOrder.menu}{eachOrder.price}</Link> 
                </div>
            )
        })
    }

    <form onSubmit={handleSubmitDelete}>
        <button type="sumbit">Delete</button>
    </form>
    <form onSubmit={handleSubmitTake}>
        <button type="sumbit">Teak Home</button>
    </form>

    <form onSubmit={handleSubmitDelete}>
        <label htmlFor="name">Card holder</label>
        <input 
        type="text"
        name="name"
        onChange={handleNameChange}
        value={name}
        />

        <label htmlFor="number">Count Number</label>
        <input 
        type="number"
        name="number"
        onchange={handleNumberChange}
        value={number}/> 


         <button type="submit">Pay</button> 
    </form>
   
    

    
</div>
  )
}

export default OrderList