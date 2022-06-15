import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import {
  deleteProductService,
  getProductDetailsService,
} from "../../services/product.services";
import PreOrder from "../order/PreOrder";

function ProductDetails(props) {
  //1. status create

  const [productDetails, setProductDetails] = useState(null);
  const { isAdmin } = useContext(AuthContext);

  const { id } = useParams();

  const navigate = useNavigate();

  //function to add a pproduct to my basket

  const handlePreAdd = async (e) => {
    e.preventDefault();

    props.addProductPre(productDetails);
  };

  const handleList = async (e) => {
    e.preventDefault();
    navigate("/product");
  };

  //component did mount

  useEffect(() => {
    getProductDetails();
  }, []);

  //3. function view order details

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
          <img src={productDetails.imagenUrl} style={{width:"200px"}} alt="picture"/>
        </main>

        <form>
          <button class="home-main-button-about-add" onClick={handlePreAdd}>
            Add
          </button>
        </form>

        {isAdmin && (
          <button class="home-main-button-about-delete" onClick={handleDelete}>
            Delete
          </button>
        )}

        <Link to={`/product/${id}/edit`}>
          {isAdmin && <button class="home-main-button-about-edit">Edit</button>}
        </Link>

        <button class="home-main-button-about-list" onClick={handleList}>
          Product list
        </button>
      </div>

      <div>
        <PreOrder
          preProducts={props.allProductsOrder}
          preMenus={props.allMenuOrder}
        />
      </div>
    </>
  );
}

export default ProductDetails;
