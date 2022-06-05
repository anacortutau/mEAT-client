import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addNewMenuService } from '../services/menu.services'


function AddFormMenu(props) {

    const [name, setName] = useState("")
    const [products, setProducts] = useState("")
    const [price, setPrice] = useState(0)
   

    const navigate= useNavigate()


    const handleNameChange = (e) => setName(e.target.value);
    const handleProducts =(e) => setProducts(e.target.value);
    const handlePriceChange = (e) => setPrice(e.target.value);

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

        <h3>Create New Menu</h3>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          onChange={handleNameChange}
          value={name}
        />

        <label htmlFor="products">Products</label>
        <input
          type="text"
          name="products"
          onChange={handleProducts}
          value={products}
        />

        <label htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          onChange={handlePriceChange}
          checked={price}
        />
            <button type="submit">Add</button>
    </form> 
    </div>
  )
}

export default AddFormMenu