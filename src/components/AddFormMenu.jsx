import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addNewMenuService } from '../services/menu.services'
import { getAllProductService } from '../services/product.services'


function AddFormMenu(props) {

    const [name, setName] = useState("")
    const [products, setProducts] = useState([])
    const [price, setPrice] = useState(0)
   

    const navigate= useNavigate()


    const handleNameChange = (e) => setName(e.target.value);
    const handleProducts =(selectOption)=>{
      setProducts({selectOption})
      console.log(selectOption)
    } 
    const handlePriceChange = (e) => setPrice(e.target.value);



    useEffect(()=>{
      allProducts()
     

    },[])

    const allProducts = async(e)=>{

      try{
        const response = await getAllProductService()
        setProducts(response.data)
      }catch(error){
        navigate("/error")
      }
    }

    const handleSubmit = async(e) =>{
        e.preventDefault()
        

        try{

            const newMenu = {
              name,
              products,
              price    
            }

            await addNewMenuService(newMenu)
            props.getAllMenu()
            navigate("/menu")
           
        }catch(error){
            navigate("/error")
        }
    }

   

  


  return (
    <div>


     
       <section class="title-create-menu">

        <h3 class="create-menu">Create New Menu</h3>
        
      <form onSubmit={handleSubmit}>
      <section class="form-menu">
       
        
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          onChange={handleNameChange}
          value={name}
        />
        
        <section class="form-menu">


        
      
       
        <label htmlFor="products">Products</label>
         <select value={products} name="products" onChange={handleProducts}>
          
        {products.map((eachProduct)=>{
          return(
            <option key={eachProduct._id} value={eachProduct._id}>{eachProduct.name}</option> 
           
          ) 
        })}

        </select>
          </section>
         
        <label htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          onChange={handlePriceChange}
          checked={price}
        />
        </section>
        <br />
            <button  className="home-main-button">Add</button>    
    </form> 
    
    </section>
    </div>
  )
}

export default AddFormMenu