import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getMenuDetailsService,
  patchMenuService,
} from "../../services/menu.services";
import { getAllProductService } from "../../services/product.services";

function MenuEdit() {
  // status for date
  const [name, setName] = useState("");
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState(0);

  const navigate = useNavigate();
  const { id } = useParams();

  const hanldeNameChange = (e) => setName(e.target.value);
  const handleProductsChange = (e) => setProducts(e.target.value);
  const handlePriceChange = (e) => setPrice(e.target.value);

  //function edit menu

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const editMenu = {
        name,
        products,
        price,
      };

      await patchMenuService(id, editMenu);
      navigate("/menu");
    } catch (error) {
      navigate("/error");
    }
  };

  // component did mount

  useEffect(() => {
    getMenuDetails();
    allProducts();
  }, []);

  //function find the products

  const allProducts = async (e) => {
    try {
      const response = await getAllProductService();
      setProducts(response.data);
    } catch (error) {
      navigate("/error");
    }
  };

  //funcion menu details

  const getMenuDetails = async () => {
    try {
      const response = await getMenuDetailsService(id);
      const { name, products, price } = response.data;
      console.log(response.data);
      setName(name);
      setProducts(products);
      setPrice(price);
    } catch (error) {
      navigate("/error");
    }
  };

  return (
    <div>
      <h3>Edit Menu</h3>

      <form onSubmit={handleSubmit}>
        <section class="form-menu">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            onChange={hanldeNameChange}
            value={name}
          />
          <section class="form-menu">
            <label htmlFor="products">Products</label>
            <select
              name="products"
              value={products}
              onChange={handleProductsChange}
            >
              {products.map((eachProduct) => {
                return (
                  <option key={eachProduct._id} value={eachProduct._id}>
                    {eachProduct.name}
                  </option>
                );
              })}
            </select>
          </section>

          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            onChange={handlePriceChange}
            checked={price}
          />
        </section>

        <button className="home-main-button" type="submit">
          Edit
        </button>
      </form>
    </div>
  );
}

export default MenuEdit;
