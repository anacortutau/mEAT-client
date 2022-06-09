import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addNewOrderService,
  deleteOrderService,
  getAllOrderService,
} from "../../services/order.services";
import PreOrder from "./PreOrder";

function OrderList(props) {
  // status of the date

  const [allOrder, setAllOrder] = useState(null);
  const [buscando, setBuscando] = useState(true);
  const { id } = useParams();

  const navigate = useNavigate();

  //function creates the order for both menu and products in the db

  const handleBuy = async (e) => {
    e.preventDefault();

    const products = props.allProductsOrder.map(
      (eachProduct) => eachProduct.id
    );
    const menus = props.allMenuOrder.map((eachMenu) => eachMenu.id);
    const basket = {
      id: id,
      products: products,
      menus: menus,
    };

    try {
      await addNewOrderService(basket);
    } catch (error) {}
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deleteOrderService(e.target.id);
      navigate("/order");
    } catch (error) {
      navigate("/error");
    }

    navigate("/");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/");
  };

  useEffect(() => {
    getAllOrder();
  }, []);

  //function that looks for the data

  const getAllOrder = async () => {
    try {
      const response = await getAllOrderService();
      console.log(response.data);
      setAllOrder(response.data);
      setBuscando(false);
    } catch (error) {
      navigate("/error");
    }
  };

  //4 el loading

  if (buscando === true) {
    return <h3>...Loading</h3>;
  }

  return (
    <>
      <div>
        <main class="home-main">
          <h3 class="home-main-tex">Take Home</h3>

          <div>
            <PreOrder
              preProducts={props.allProductsOrder}
              preMenus={props.allMenuOrder}
            />
          </div>

          <form>
            <button
              className="home-main-button-products-buy"
              onClick={handleBuy}
            >
              To Buy
            </button>
          </form>
          {/* todas mis preorder */}

          {/* todas mis ordenes */}
          {allOrder === null && <h3>...Loading</h3>}
          {allOrder !== null &&
            allOrder.map((eachOrder) => {
              return (
                <div key={eachOrder._id}>
                  {eachOrder.menu.map((eachMenu) => {
                    return <li key={eachMenu._id}>{eachMenu.name}</li>;
                  })}

                  {eachOrder.products.map((eachProduct) => {
                    return <li key={eachProduct._id}>{eachProduct.name}</li>;
                  })}
                  <p>Price Total:{eachOrder.price}€</p>
                  <br />
                  <br />

                  <button
                    className="home-main-button-products-deleleOrder"
                    id={eachOrder._id}
                    onClick={handleDelete}
                  >
                    Delete Order
                  </button>
                </div>
              );
            })}

          <br />
        </main>
      </div>
    </>
  );
}

export default OrderList;
