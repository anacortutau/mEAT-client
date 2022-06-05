import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AddFormMenu from '../../components/AddFormMenu'
import { getAllMenuService } from '../../services/menu.services'


function MenuList() {

     //1. Estado para la data
     const [allMenu, setAllMenu] = useState(null)
     const [allProducts, setAllProducts] = useState(null)
     const [buscando, setBuscando] =useState(true)
 
     const navigate= useNavigate()
 
     useEffect(()=>{

        getAllMenus()

    }, [])

    //3. La funcion que busca la data

    const getAllMenus = async() =>{

        try{

           const response = await getAllMenuService()
           console.log(response.data)
           setAllMenu(response.data)
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
         <h3>List Menu</h3>
            {allMenu === null && <h3>...Loading</h3>}
        
            {
            allMenu!== null && allMenu.map((eachMenu)=>{
                    return(
                        <div key={eachMenu._id}>
                        <Link to={`/menu/${eachMenu._id}/details`}>
                            {eachMenu.name}{eachMenu.products}{eachMenu.price}</Link> 
                        </div>
                    )
                    
                })
                
            }
        


            <AddFormMenu getAllMenus= {getAllMenus}/>
                <button type="submit">Home</button>

    </div>
  )
}

export default MenuList