import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./component/Home";
import Footer from "./component/Layout/Footer";
import Header from "./component/Layout/Header";
import ViewProduct from "./component/Product/ViewProduct";
import CartData from "./component/cart/CartData";
import AuthProvider from "./component/context/authContext";
import CartProvider from "./component/context/cartContext";
import { CartProviderFunction } from "./component/context/context";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <CartProviderFunction>
          <div className="App">
            <Header />
            <div className="container container-fluid">
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route
                  path="/api/product/:id"
                  element={<ViewProduct />}
                ></Route>
                <Route path="/cart" element={<CartData />}></Route>
              </Routes>
            </div>
            <Footer />
          </div>
        </CartProviderFunction>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
