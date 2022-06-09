import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deleteOrderService,
  getOrderDetailsService,
} from "../../services/order.services";

function OrderDetails() {
  // status of the date

  const [orderDetails, setOrderDetails] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleList = async (e) => {
    e.preventDefault();
    navigate("/order");
  };

  // component did mount

  useEffect(() => {
    getOrderDetails();
  }, []);

  //3. funcion that looks for the date

  const getOrderDetails = async () => {
    try {
      const response = await getOrderDetailsService(id);
      console.log(response.data);
      setOrderDetails(response.data);
    } catch (error) {
      navigate("/error");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteOrderService(id);
      navigate("/order");
    } catch (error) {
      navigate("/error");
    }
  };

  //4. loading

  if (orderDetails === null) {
    return <h3>...Loading</h3>;
  }

  return (
    <div>
      <h3>Order Details</h3>
      <h4>Products: {orderDetails.products.name}</h4>
      <h4>Menu: {orderDetails.menu.name}</h4>
      <h3>Price: {orderDetails.price}</h3>

      <button onClick={handleDelete}>Delete</button>

      <Link to={`/order/${id}/edit`}>
        <button>Edit</button>
      </Link>

      <button onClick={handleList}>Order list</button>
    </div>
  );
}

export default OrderDetails;
