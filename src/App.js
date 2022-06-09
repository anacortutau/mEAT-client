
import './App.css';
import { Routes, Route } from "react-router";


//pages
import Home from './pages/Home';
import ProductList from './pages/product/ProductList';
import Error from './pages/Error';
import Family from './pages/Family';
import About from './pages/About';



//components
import Navbar from "./components/Navbar"
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import ProductDetails from './pages/product/ProductDetails';
import ProductEdit from './pages/product/ProductEdit';
import MenuList from './pages/menu/MenuList';
import MenuDetails from './pages/menu/MenuDetails';
import MenuEdit from './pages/menu/MenuEdit';
import OrderList from './pages/order/OrderList';
import OrderDetails from './pages/order/OrderDetails';
import OrderEdit from './pages/order/OrderEdit';
import Private from './components/Private'
import NotFound from './pages/NotFound';
import { useState } from 'react';





function App() {

  const [allProductsOrder, setProductsOrder] = useState([]);
  const [allMenuOrder, setAllMenuOrder] = useState([]);
  
  const addProductPre = (product) => {
    console.log(product);
    setProductsOrder([...allProductsOrder, product]);
  };

  

  const addMenuPre = (menu) => {
    setAllMenuOrder([...allMenuOrder, menu]);
  };



  return (
    <div className="App">

      <Navbar />

      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product" element={<ProductList /> } />
      <Route path="/product/:id/details" element={<Private><ProductDetails addProductPre={addProductPre} allProductsOrder={allProductsOrder} allMenuOrder={allMenuOrder} /></Private>} />
      <Route path="/product/:id/edit" element={<Private><ProductEdit/></Private>} />

      <Route path="/menu" element={<MenuList /> } />
      <Route path="/menu/:id/details" element={<Private><MenuDetails addMenuPre={addMenuPre} allProductsOrder={allProductsOrder} allMenuOrder={allMenuOrder}/></Private>} />
      <Route path="/menu/:id/edit" element={<MenuEdit />} />

      <Route path="/order" element={<OrderList allProductsOrder={allProductsOrder} allMenuOrder={allMenuOrder}/>} />
      <Route path="/order/:id/details" element={<OrderDetails />} />
      <Route path="/order/:id/edit" element={<OrderEdit />} />

      <Route path="/family" element={<Family />} />
      <Route path="/about" element={<About />} />
      

      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* error FE routes */}
      <Route path="/error" element={<Error />} />
      <Route path="*" element={<NotFound />} />


      </Routes>


     
    </div>
  );
}

export default App;
