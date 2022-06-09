import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { deleteMenuService, getMenuDetailsService } from '../../services/menu.services'
import PreOrder from '../order/PreOrder'
import ProductList from '../product/ProductList'

function MenuDetails() {

      //1. creamos un estado

      const [menuDetails, setMenuDetails] = useState(null)
      const {id}= useParams()
      const[allMenuOrder, setAllMenuOrder] = useState([])
      const navigate = useNavigate()

      

      const handlePreAdd= async (e)=>{
          e.preventDefault()

          setAllMenuOrder([...allMenuOrder, {id: id, name: menuDetails.name} ])
      }


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
    <>
    <div>

        <h3>Menu Details</h3>
        <h4>{menuDetails.name}</h4>
       
        {
            menuDetails.products.map((eachProduct)=>{
                return(
                    <li key={eachProduct._id}>{eachProduct.name}</li>
                )
            })
        }
        <h4>Price:{menuDetails.price}€</h4>

        <form><button class="home-main-button-about-add" onClick={handlePreAdd} >Add</button></form>

        <button class="home-main-button-about-delete" onClick={handleDelete}>Delete</button>

        <Link to={`/menu/${id}/edit`}><button class="home-main-button-about-edit">Edit</button></Link>

        <button class="home-main-button-about-list" onClick={handleList}>Menu list</button>
    </div>

    <div>
        <PreOrder preMenus={allMenuOrder} />
      </div>


    </>
   
  )
}

export default MenuDetails