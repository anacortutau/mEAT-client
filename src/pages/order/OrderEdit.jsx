import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getOrderDetailsService, patchOrderService } from '../../services/order.services';

function OrderEdit() {

    const [products, setProducts] = useState("");
    const [menu, setMenu] = useState("");
    const {id} = useParams()
    const navigate= useNavigate()

    const hanldeProductsChange = (e) => setProducts(e.target.value);
    const handleMenuChange = (e) => setMenu(e.target.value);

    const handleSubmit = async(e) =>{
        e.preventDefault();

        try{

            const editOrder = {
                products,
                menu
            }

            await patchOrderService(id, editOrder)
            navigate(`order/${id}/details`)
        }catch(error){
            navigate("/error")
        }
    }

    useEffect(()=>{
       
        getOrderDetails()
    }, [])

    const getOrderDetails = async() =>{

        try{

            const response = await getOrderDetailsService(id)
            const {products, menu} = response.data
            console.log(response.data)
            setProducts(products)
            setMenu(menu)
           


        }catch(error){
            navigate("/error")
        }
    }

  return (
    <div>

        <h3>
            Edit Order
        </h3>

        <form onSubmit={handleSubmit}>
        <label htmlFor="products">Products</label>
        <input
          type="multiple"
          name="products"
          onChange={hanldeProductsChange}
          value={products}
        />

        <label htmlFor="menu">Menu</label>
        <input
          type="text"
          name="menu"
          onChange={handleMenuChange}
          value={menu}
        />
            <button type="submit">Edit</button>
        </form>
    </div>
  )
}

export default OrderEdit