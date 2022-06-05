import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AddFormProduct from '../../components/AddFormProduct'
import { getAllProductService } from '../../services/product.services'




function ProductList() {

    //1. Estado para la data
    const [allProducts, setAllProducts] = useState(null)
    const [buscando, setBuscando] =useState(true)

    const navigate= useNavigate()


    //2. componente DidMount

    useEffect(()=>{

        getAllProducts()

    }, [])

       

    //3. La funcion que busca la data

    const getAllProducts = async() =>{

        try{

           const response = await getAllProductService()
           console.log(response.data)
           setAllProducts(response.data)
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
       <main class="home-main">
            <h3 class="home-main-tex">List Products</h3>
        
       
       

        {allProducts === null && <h3>...Loading</h3>}
        <ul>
        {
            allProducts!== null && allProducts.map((eachProduct)=>{
                return(
                    
                    <div key={eachProduct._id}>
                       
                    <Link to={`/product/${eachProduct._id}/details`}>
                        {eachProduct.category}
                        {eachProduct.name}
                        {eachProduct.price}</Link> 
                        
                    </div>
                    
                    
                   
                )
            })
        }
        </ul>
            <AddFormProduct getAllProducts= {getAllProducts}/>
           
           <button class="home-main-button" onClick="submit">Home</button>
            
           
           </main>     
    </div>
  )
}

export default ProductList