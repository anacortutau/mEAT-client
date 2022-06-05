import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { deleteMenuService, getMenuDetailsService } from '../../services/menu.services'

function MenuDetails() {

      //1. creamos un estado

      const [menuDetails, setMenuDetails] = useState(null)
      const {id}= useParams()
      const navigate = useNavigate()

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
        <h4> Name: {menuDetails.name}</h4>
        <h4>Products:{menuDetails.products.name}</h4>
        <h3>Price: {menuDetails.price}</h3>

        <button onClick={handleDelete}>Delete</button>

        <Link to={`/menu/${id}/edit`}><button>Edit</button></Link>
    </div>
  )
}

export default MenuDetails