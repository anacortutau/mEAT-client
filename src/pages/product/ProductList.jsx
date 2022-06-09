import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddFormProduct from "../../components/AddFormProduct";

import { getAllProductService } from "../../services/product.services";
import { AuthContext } from "../../context/auth.context";

function ProductList(props) {
  //status data
  const [allProducts, setAllProducts] = useState(null);
  const [buscando, setBuscando] = useState(true);
  const { isAdmin } = useContext(AuthContext);
  console.log(isAdmin);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    navigate("/");
  };

  //2. componente did mount

  useEffect(() => {
    getAllProducts();
  }, []);

  // function finds the date

  const getAllProducts = async () => {
    try {
      const response = await getAllProductService();
      console.log(response.data);
      setAllProducts(response.data);
      setBuscando(false);
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/login");
      } else {
        navigate("/error");
      }
    }
  };

  //4 el loading

  if (buscando === true) {
    return <h3>...Loading</h3>;
  }

  return (
    <div>
      <main class="home-main">
        <h3 class="home-main-tex">List Products</h3>

        {allProducts === null && <h3>...Loading</h3>}
        <ul>
          {allProducts !== null &&
            allProducts.map((eachProduct) => {
              return (
                <div key={eachProduct._id}>
                  <section class="products">
                    <Link to={`/product/${eachProduct._id}/details`}>
                      <button className="home-main-button-products">
                        {eachProduct.name}
                      </button>
                    </Link>
                    <br />
                  </section>
                </div>
              );
            })}
        </ul>
        {isAdmin && <AddFormProduct getAllProducts={getAllProducts} />}

        <form onSubmit={handleSubmit}>
          <button class="home-main-button" onClick="submit">
            Home
          </button>
        </form>
      </main>
    </div>
  );
}

export default ProductList;
