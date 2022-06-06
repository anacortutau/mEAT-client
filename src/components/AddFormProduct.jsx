import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addNewProductService } from '../services/product.services'

function AddFormProduct(props) {

    const [category, setCategory] = useState("")
    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)

    const navigate= useNavigate()


    const handleCategoryChange = (e) => setCategory(e.target.value);
    const handleNameChange =(e) => setName(e.target.value);
    const handlePriceChange = (e) => setPrice(e.target.value);

    const handleSubmit = async(e) =>{
        e.preventDefault()

        try{

            const newProduct = {
                category,
                name,
                price
            }

            await addNewProductService(newProduct)
            props.getAllProducts()
            navigate("/product")
        }catch(error){
            navigate("/error")
        }
    }


  return (
    <div>

       <section class="title-create-product">

       
        <h3 class="create-product">Create New Product</h3>

      
           
  
      <form onSubmit={handleSubmit}>
        
        <br />
        <section class="form-products">
        <label  htmlFor="category">Category</label>
        
        <select name="category" value={category} onChange={handleCategoryChange}>
            <option value="Dish">Dish</option>
            <option value="Garrison">Garrison</option>
            <option value="Dessert">Dessert</option>
            <option value="Beverage">Beverage</option>
        </select>
       
        <br />

        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          onChange={handleNameChange}
          value={name}
        />
        <br />

        <label htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          onChange={handlePriceChange}
          checked={price}
        />
         </section>
        <br />
        <br />
            <button className="home-main-button" type="submit">Add</button>
            
    </form> 
    </section>
    </div>
  )
}

export default AddFormProduct