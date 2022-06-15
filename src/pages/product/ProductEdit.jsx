import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getProductDetailsService,
  patchProductService,
} from "../../services/product.services";

function ProductEdit() {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);

  const navigate = useNavigate();
  const { id } = useParams();

  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handlePriceChange = (e) => setPrice(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const editProduct = {
        category,
        name,
        price,
      };

      await patchProductService(id, editProduct);
      navigate("/product");
    } catch (error) {
      navigate("/error");
    }
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    try {
      const response = await getProductDetailsService(id);
      const { category, name, price } = response.data;
      console.log(response.data);
      setCategory(category);
      setName(name);
      setPrice(price);
    } catch (error) {
      navigate("/error");
    }
  };


  return (
    <div>
      <h3>Edit Product</h3>

      <section class="form-products">
        <form onSubmit={handleSubmit}>
          <label htmlFor="category">Category</label>
          <select
            name="category"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="Dish">Dish</option>
            <option value="Garrison">Garrison</option>
            <option value="Dessert">Dessert</option>
            <option value="Beverage">Beverage</option>
          </select>
          <section class="form-products">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              onChange={handleNameChange}
              value={name}
            />
          </section>

          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            onChange={handlePriceChange}
            checked={price}
          />

         

          <button className="home-main-button">Edit</button>
        </form>
      </section>
    </div>
  );
}

export default ProductEdit;
