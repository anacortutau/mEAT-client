import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNewMenuService } from "../services/menu.services";
import { getAllProductService, uploadService } from "../services/product.services";

function AddFormMenu(props) {
  //1. status for date
  const [name, setName] = useState("");
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([]);
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");

  const navigate = useNavigate();

  const handleNameChange = (e) => setName(e.target.value);

  const handleItems = (e) => {
    
    let productSelect = Array.from(e.target.selectedOptions, option => option.value);
    
    setItems(productSelect);
  };

  const handlePriceChange = (e) => setPrice(e.target.value);

  //2. component did mount

  useEffect(() => {
    allProducts();
  }, []);

  //3. function finds the date

  const allProducts = async (e) => {
    try {
      const response = await getAllProductService();
      setProducts(response.data);
    } catch (error) {
      navigate("/error");
    }
  };

  //function create the data

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newMenu = {
        name,
        products: items,
        price,
        image
      };

      await addNewMenuService(newMenu);
      props.getAllMenus();

      navigate("/menu");
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
      <section class="title-create-menu">
        <h3 class="create-menu">Create New Menu</h3>

        {/* create menu form */}

        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            onChange={handleNameChange}
            value={name}
          />

          <section class="form-menu">
            <label htmlFor="products">Products</label>
            <select name="products[]" onChange={handleItems} multiple>
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

          <label htmlFor="image">Picture</label>
          <input type="file"  name="image" onChange={handleImageChange}/>

          <img src={image} alt="picture" />

          <br />
          <button className="home-main-button">Add</button>
        </form>
      </section>
    </div>
  );
}

export default AddFormMenu;
