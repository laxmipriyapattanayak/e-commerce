import React from 'react'
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import {Home} from '../pages/Home'
import { NavBar } from 'layout/NavBar';
import Products from 'pages/Products';
import Signin from 'pages/Signin';
import { Signup } from 'pages/Signup';
import ProductDetails from 'pages/ProductDetails';
import Profile from 'pages/Profile';
import Activate from 'pages/Activate';
import { CreateProduct } from 'pages/CreateProduct';


import { ForgotPassword } from 'pages/ForgotPassword';
import { CreateCategory } from 'pages/CreateCategory';

import NoPage from 'pages/NoPage';
import AllUsers from 'pages/AllUsers';
import ResetPassword from 'pages/ResetPassword';
import Cart from 'pages/Cart';
import CategoryProduct from 'pages/CategoryProduct';


const Index = () => {
  
  
  return (
    <BrowserRouter>
      <ToastContainer />
      <NavBar />
      <main>
      <Routes>
          <Route path= "/" element={<Home/>} />
          <Route path= "/products" element={<Products/>} />
          <Route path= "/SignIn" element={<Signin/>} />
          <Route path= "/SignUp" element={<Signup/>} />
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/forgotPassword" element={<ForgotPassword/>}/>
          <Route path="/reset-password/:token" element={<ResetPassword/>}/>
          <Route path= "/cart" element={<Cart/>} />
          <Route path="/category/:id/product" element={<CategoryProduct/>}/>
          <Route path= "/product/:slug" element={<ProductDetails />}/>
          <Route path="/activate/:token" element={<Activate/>}/>

          <Route path="/admin/createProduct" element={<CreateProduct/>}/>
          <Route path="/admin/updateProduct/:slug" element={<CreateProduct/>}/>
          <Route path="/admin/createCategory" element={<CreateCategory/>}/>
          <Route path="/admin/updateCategory/:slug" element={<CreateCategory/>}/>
          <Route path="/admin/allUsers" element={<AllUsers/>}/>
          <Route path="*" element={<NoPage />} />
      </Routes>
      </main>
      
    </BrowserRouter>
  )
}

export default Index