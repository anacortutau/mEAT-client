import React, { useEffect, useState } from 'react'
import { getAllProductService } from '../services/product.services'

function ProductItem() {

    const [products, setProducts] = useState([])

    useEffect(()=>{

    },[])

    const getAllProducts = async()=>{

        try{

            const response = await getAllProductService()
            setProducts(response.datq)


        }catch(error){
            navigator("/error")
        }
    }




  return (
    <div>



    </div>
  )
}

export default ProductItem