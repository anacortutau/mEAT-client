import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { deleteProductService, getProductDetailsService } from '../../services/product.services'
import {addNewOrderService} from '../../services/order.services'
import PreOrder from '../order/PreOrder'

function ProductDetails() {

    //1. creamos un estado

    const [productDetails, setProductDetails] = useState(null)
    const [allProductsOrder, setProductsOrder] = useState([])
    const {id}= useParams()
    const navigate = useNavigate()

    const handlePreAdd = async(e)=>{
        e.preventDefault()

        setProductsOrder([...allProductsOrder, {id: id, name:productDetails.name}])

    }

    

    const handleList = async(e)=>{
        e.preventDefault()
        navigate("/product")
    }

    //2. componentDidMount

    useEffect(()=>{
        getProductDetails()

    }, [])

    //3. funcion

    const getProductDetails = async() =>{
        try{
            const response = await getProductDetailsService(id)
            setProductDetails(response.data)
        }catch(error){
            navigate("/error")
        }
    }

    const handleDelete = async() =>{

        try{
            await deleteProductService(id)
            navigate("/product")
        }catch(error){
            navigate("/error")
        }
    }

    //4. loading

    if(productDetails === null){
        return <h3>...Loading</h3>
    }

  return (
      <>
    <div>

        <h3>Product Details</h3>
        <h4>Category: {productDetails.category}</h4>
        <h4>Name: {productDetails.name}</h4>
        <h3>Price: {productDetails.price}</h3>

                <form><button onClick={handlePreAdd} >Agregar</button></form>

        <button onClick={handleDelete}>Delete</button>

        <Link to={`/product/${id}/edit`}><button>Edit</button></Link>

        <button onClick={handleList}>Product list</button>
    </div>

    <div>
        <PreOrder preProducts={allProductsOrder} />
    </div>
    </>
  )
}



export default ProductDetails