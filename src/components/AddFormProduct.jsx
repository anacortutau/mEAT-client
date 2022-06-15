import { getNextKeyDef } from "@testing-library/user-event/dist/keyboard/getNextKeyDef";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNewProductService, uploadService } from "../services/product.services";

function AddFormProduct(props) {
  //1. status for date
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");

  const navigate = useNavigate();

  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handlePriceChange = (e) => setPrice(e.target.value);

  //2. funcion create the data

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newProduct = {
        category,
        name,
        price,
        image
      };

      await addNewProductService(newProduct);
      props.getAllProducts();
      navigate("/product");
    } catch (error) {
      navigate("/error");
    }
  };

  const handleImageChange = async (e)=>{

    console.log(e.target.files[0])

    const uploadForm = new FormData()
    uploadForm.append("image", e.target.files[0])

     try{

      const response = await uploadService(uploadForm)
      console.log(response.data)
      setImage(response.data)

     }catch{

        navigate("/error")

     }



  }

  return (
    <div>
      <section class="title-create-product">
        <h3 class="create-product">Create New Product</h3>

        {/* create products form */}

        <form onSubmit={handleSubmit}>
          <br />

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

          <br />

          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            onChange={handleNameChange}
            value={name}
          />
          <br />

          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            onChange={handlePriceChange}
            checked={price}
          />

          <label htmlFor="image">Picture</label>
          <input type="file"  name="image" onChange={handleImageChange}/>

          <img src={image} alt="picture" />

          <br />
          <br />
          <button className="home-main-button" type="submit">
            Add
          </button>
        </form>
      </section>
    </div>
  );
}

export default AddFormProduct;
