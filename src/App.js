import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./component/Home";
import Footer from "./component/Layout/Footer";
import Header from "./component/Layout/Header";
import ViewProduct from "./component/Product/ViewProduct";
import CartData from "./component/cart/CartData";
import AuthProvider from "./component/context/authContext";
import CartProvider from "./component/context/cartContext";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="App">
          <Header />
          <div className="container container-fluid">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/api/product/:id" element={<ViewProduct />}></Route>
              <Route path="/cart" element={<CartData />}></Route>
            </Routes>
          </div>
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
