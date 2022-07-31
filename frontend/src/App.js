import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Error from "./pages/Error";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Shipping from "./pages/Shipping";
import Payment from "./pages/Payment";
import PlaceOrder from "./pages/PlaceOrder";
import UsersList from "./pages/UsersList";
import UserEdit from "./pages/UserEdit";
import ProductList from "./pages/ProductList";
import ProductEdit from "./pages/ProductEdit";
import Orders from "./pages/Orders";
import About from "./pages/About";
import OurProducts from "./pages/OurProducts";
import Favourites from "./pages/Favourites";

function App() {
  return (
    <Router>
      <Header />

      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/signin" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/ourproducts" element={<OurProducts />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart/:id" element={<Cart />} />
            <Route path="/cart/" element={<Cart />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/placeOrder" element={<PlaceOrder />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/admin/user/:id/edit" element={<UserEdit />} />
            <Route path="admin/orderlist" element={<Orders />} />
            <Route path="/admin/usersList" element={<UsersList />} />
            <Route path="/admin/productList" element={<ProductList />} />
            <Route path="/admin/product/:id/edit" element={<ProductEdit />} />
            <Route path="/favourites/:id" element={<Favourites />} />
            <Route path="/" element={<Home />} />
            <Route path="/search/:keyword" element={<OurProducts />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
