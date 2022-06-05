
import './App.css';
import { Routes, Route } from "react-router";


//pages
import Home from './pages/Home';
import ProductList from './pages/product/ProductList';
import Error from './pages/Error';



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



function App() {
  return (
    <div className="App">

      <Navbar />

      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product" element={<ProductList /> } />
      <Route path="/product/:id/details" element={<ProductDetails />} />
      <Route path="/product/:id/edit" element={<ProductEdit />} />

      <Route path="/menu" element={<MenuList /> } />
      <Route path="/menu/:id/details" element={<MenuDetails />} />
      <Route path="/menu/:id/edit" element={<MenuEdit />} />

      <Route path="/order" element={<OrderList />} />
      <Route path="/order/:id/details" element={<OrderDetails />} />
      <Route path="/order/:id/edit" element={<OrderEdit />} />

      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* error FE routes */}
      <Route path="/error" element={<Error />} />


      </Routes>


     
    </div>
  );
}

export default App;
