import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addNewOrderService,
  deleteOrderService,
  getAllOrderService,
} from "../../services/order.services";
import PreOrder from "./PreOrder";

//SACAR EL PEDIDO FILTRANDO POR EL NOMBRE DEL MENU Y EL NOMBRE DEL PRODUCTO
//FALTA QUE FILTRE TAMBIEN POR EL NOMBRE, APELLIDOS, DIRRECION DEL USUARIO

function OrderList(props) {
  //1. Estado para la data

  const [allOrder, setAllOrder] = useState(null);
  const [buscando, setBuscando] = useState(true);
  const { id } = useParams();
  

  //   const [name, setName] =useState(null)
  //   const[number, setNumber] = useState(0)

  //   const handleNameChange = (e)=>setName(e.target.value)
  //   const handleNumberChange = (e)=>setNumber(e.target.value)

  const navigate = useNavigate();

  const handleBuy = async (e) => {
    e.preventDefault();

    const products = props.allProductsOrder.map((eachProduct)=> eachProduct.id)
    const menus = props.allMenuOrder.map((eachMenu)=> eachMenu.id)
    const basket = {
      id: id,
      products :products,
      menus: menus
      
    }


    try{

      await addNewOrderService(basket)

    }catch(error){

    }

    
  };

  const handleDelete = async (e) => {
    e.preventDefault()
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

  //3. La funcion que busca la data

  const getAllOrder = async () => {
    try {
      const response = await getAllOrderService();
      console.log(response.data);
      setAllOrder(response.data);
      setBuscando(false);
    } catch (error) {
      navigate("/error");
      // if(error.response.status === 401){
      //     navigate("/login")
      // }else{

      //     navigate("/error")

      // }
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
            <PreOrder preProducts={props.allProductsOrder} preMenus= {props.allMenuOrder} />
            </div>
         
          <form>
            <button onClick={handleBuy}>To Buy</button>
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

                  <button id={eachOrder._id} onClick={handleDelete}>Delete Order</button>

                  {/* <Link to={`/order/${eachOrder._id}/details`}>Details Menu</Link>  */}
                </div>
              );
            })}

          <br />

        
          

          {/* <form onSubmit={handleSubmit}>
    <section class="form-pay">
        <label htmlFor="name">Card holder</label>
        <input 
        type="text"
        name="name"
        onChange={handleNameChange}
        value={name}
        />
        </section>
        <section class="form-pay">
        <label htmlFor="number">Count Number</label>
        <input 
        type="number"
        name="number"
        onchange={handleNumberChange}
        value={number}
        /> 
         </section>
         <button class="home-main-button" type="submit">Pay</button> 
    </form> */}
        </main>
      </div>
    </>
  );
}

export default OrderList;
