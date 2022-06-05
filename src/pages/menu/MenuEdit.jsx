import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getMenuDetailsService, patchMenuService } from '../../services/menu.services';

function MenuEdit() {

    const [name, setName] = useState("");
    const [products, setProducts] = useState("");
    const [price, setPrice]= useState(0)
    const navigate= useNavigate()
    const {id} = useParams()

    const hanldeNameChange = (e) => setName(e.target.value);
    const handleProductsChange = (e) => setProducts(e.target.value);
    const handlePriceChange = (e) => setPrice(e.target.value);

    const handleSubmit = async(e) =>{
        e.preventDefault();

        try{

            const editMenu = {
                name,
                products,
                price
            }

            await patchMenuService(id, editMenu)
            navigate("/menu")
        }catch(error){
            navigate("/error")
        }
    }

    useEffect(()=>{
       
        getMenuDetails()
    }, [])

    const getMenuDetails = async() =>{

        try{

            const response = await getMenuDetailsService(id)
            const {name, products, price} = response.data
            console.log(response.data)
            setName(name)
            setProducts(products)
            setPrice(price)


        }catch(error){
            navigate("/error")
        }
    }





  return (
    <div>

        <h3>
            Edit Menu
        </h3>

        <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          onChange={hanldeNameChange}
          value={name}
        />

        <label htmlFor="products">Products</label>
        <select name="products" value={products.name} onChange={handleProductsChange}>
            
        </select>


        <label htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          onChange={handlePriceChange}
          checked={price}
        />  

            <button type="submit">Edit</button>
        </form>
    </div>
  )
}

export default MenuEdit