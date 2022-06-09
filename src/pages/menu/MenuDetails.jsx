import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deleteMenuService,
  getMenuDetailsService,
} from "../../services/menu.services";
import PreOrder from "../order/PreOrder";
import { AuthContext } from "../../context/auth.context";

function MenuDetails(props) {

  //1. status for date

  const [menuDetails, setMenuDetails] = useState(null);
  const { isAdmin } = useContext(AuthContext);
  const { id } = useParams();

  const navigate = useNavigate();

  const handlePreAdd = async (e) => {
    e.preventDefault();
    props.addMenuPre({ id: id, name: menuDetails.name });
  };

  const handleList = async (e) => {
    e.preventDefault();
    navigate("/menu");
  };

  //2. component did mount

  useEffect(() => {
    getMenuDetails();
  }, []);

  //3. function finds the date

  const getMenuDetails = async () => {
    try {
      const response = await getMenuDetailsService(id);
      setMenuDetails(response.data);
    } catch (error) {
      navigate("/error");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMenuService(id);
      navigate("/menu");
    } catch (error) {
      navigate("/error");
    }
  };

  //4. loading

  if (menuDetails === null) {
    return <h3>...Loading</h3>;
  }

  return (
    <>
      <div>
        <h3>Menu Details</h3>
        <h4>{menuDetails.name}</h4>

        {menuDetails.products.map((eachProduct) => {
          return <li key={eachProduct._id}>{eachProduct.name}</li>;
        })}
        <h4>Price:{menuDetails.price}€</h4>

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

        {isAdmin && (
          <Link to={`/menu/${id}/edit`}>
            <button class="home-main-button-about-edit">Edit</button>
          </Link>
        )}

        <button class="home-main-button-about-list" onClick={handleList}>
          Menu list
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

export default MenuDetails;
