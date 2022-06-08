import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { deleteMenuService, getMenuDetailsService } from '../../services/menu.services'
import ProductList from '../product/ProductList'

function MenuDetails() {

      //1. creamos un estado

      const [menuDetails, setMenuDetails] = useState(null)
      const {id}= useParams()
      const navigate = useNavigate()




      const handleList = async(e) =>{
          e.preventDefault()
          navigate("/menu")
      }

      //2. componentDidMount

    useEffect(()=>{
        getMenuDetails()

    }, [])

    //3. funcion

    const getMenuDetails = async() =>{
        try{
            const response = await getMenuDetailsService(id)
            setMenuDetails(response.data)
            
            
        }catch(error){
            navigate("/error")
        }
    }

    const handleDelete = async() =>{

        try{
            await deleteMenuService(id)
            navigate("/menu")
        }catch(error){
            navigate("/error")
        }
    }

     //4. loading

     if(menuDetails === null){
        return <h3>...Loading</h3>
    }


  return (
    <div>

        <h3>Menu Details</h3>
        <h4> Name:{menuDetails.name}</h4>
       
        {
            menuDetails.products.map((eachProduct)=>{
                return(
                    <li>{eachProduct.name}</li>
                )
            })
        }
        <h3>Total price:{menuDetails.price}</h3>

        <form action="/order">
                <input type="number" name="qty"  />
                <button >Agregar</button>
                </form>

        <button onClick={handleDelete}>Delete</button>

        <Link to={`/menu/${id}/edit`}><button>Edit</button></Link>

        <button onClick={handleList}>Menu list</button>
    </div>
  )
}

export default MenuDetails