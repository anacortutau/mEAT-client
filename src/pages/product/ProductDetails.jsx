import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deleteProductService,
  getProductDetailsService,
} from "../../services/product.services";
import PreOrder from "../order/PreOrder";
import { AuthContext } from "../../context/auth.context";


function ProductDetails() {
  //1. creamos un estado

  const [productDetails, setProductDetails] = useState(null);
  const [allProductsOrder, setProductsOrder] = useState([]);
  const { id } = useParams();
  const {isLoggedIn} = useContext(AuthContext)
  const navigate = useNavigate();

  const handlePreAdd = async (e) => {
    e.preventDefault();

    setProductsOrder([
      ...allProductsOrder,
      { id: id, name: productDetails.name },
    ]);
  };

  const handleList = async (e) => {
    e.preventDefault();
    navigate("/product");
  };

  //2. componentDidMount

  useEffect(() => {
    getProductDetails();
  }, []);

  //3. funcion

  const getProductDetails = async () => {
    try {
      const response = await getProductDetailsService(id);
      setProductDetails(response.data);
    } catch (error) {
      navigate("/error");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProductService(id);
      navigate("/product");
    } catch (error) {
      navigate("/error");
    }
  };

  //4. loading

  if (productDetails === null) {
    return <h3>...Loading</h3>;
  }

  return (
    <>
    
      <div>
      <main class="home-main">
         
        <h3>Product Details</h3>
        <h4>{productDetails.category}</h4>
        <h4>{productDetails.name}</h4>
        <h4>Price:{productDetails.price}€</h4>
             
         
         </main>
       
        {isLoggedIn &&
        <form>
          <button class="home-main-button-about-add" onClick={handlePreAdd}>Add</button>
        </form>
        }
        {isLoggedIn && 
        <button class="home-main-button-about-delete" onClick={handleDelete}>Delete</button>
        }   
        {isLoggedIn &&    
        <Link to={`/product/${id}/edit`}>
          <button class="home-main-button-about-edit">Edit</button>
        </Link>
        } 

        {isLoggedIn &&      
        <button class="home-main-button-about-list" onClick={handleList}>Product list</button>
         } 
       
      </div>
    

      <div>
        <PreOrder preProducts={allProductsOrder} />
      </div>

    </>
  );
}

export default ProductDetails;
