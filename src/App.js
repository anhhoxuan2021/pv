import logo from './logo.svg';
import './App.css';
import { BrowserRouter , Routes, Route } from "react-router-dom";
import Home from "./pages/users/Home";
import Products from "./pages/users/Products";
import Fashion from "./pages/users/Fashion"
import FashionZoom from "./pages/users/FashionZoom"
import Test from "./pages/users/Test";
import UserPofile from "./pages/users/UserProfile"
import ChatPage from './components/chat/ChatPage';
import UserLogin from './pages/users/Login';
import Zoom from './pages/users/Zoom'
import AddLaptop from './pages/admin/AddLaptop';
import Laptop from './pages/admin/Laptop';
import Product from './pages/admin/Product';
import AddProduct from './pages/admin/AddProduct';
import Laptops from './pages/admin/Laptops';
import Layout from './layouts/Layout';

import ProductType from './pages/admin/ProductTypes';
import "./fontawasome"


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="/home" element={<Home  />} />
          <Route path="/admin/product" element={<AddProduct  />} />
          <Route path="/admin/product/:id" element={<Product  />} />
          <Route path="/admin/laptop" element={<AddLaptop />} />  
          <Route path="/admin/laptop/:id" element={<Laptop />} />  
          <Route path="/admin/laptops" element={<Laptops />} />  
          <Route path ="/admin/product-type" element ={<ProductType />} />


          
          <Route path="/products" element={<Products  />} />
          <Route path="/fashion/:id" element={<Fashion  />} />
          <Route path="/zoom/:id" element={<FashionZoom  />} />
          <Route path="/profile" element={<UserPofile />} />
          <Route path="/user_profile/:id" element={<UserPofile />} />
          <Route path="/testzoom" element={<Zoom />} />  
          <Route path="/test" element={<Test />} />  
          <Route path="/chat" element={<ChatPage />} />  
          <Route path="/login" element={<UserLogin />} />  
    
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
