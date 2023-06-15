import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./component/Home";
import Footer from "./component/Layout/Footer";
import Header from "./component/Layout/Header";
import ViewProduct from "./component/Product/ViewProduct";
import CartData from "./component/cart/CartData";
import { CartProviderFunction } from "./component/context/context";
import Login from "./component/User/Login";
import Register from "./component/User/Register";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import AfterLogin from "./component/Layout/AfterLogin";
import UpdatePassword from "./component/User/UpdatePassword";

function App() {
  return (
    <CartProviderFunction>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/api/product/:id" element={<ViewProduct />}></Route>
            <Route path="/cart" element={<CartData />}></Route>
            <Route path="/api/login" element={<Login />}></Route>
            <Route path="/api/me" element={<AfterLogin />}></Route>
            <Route path="/api/register" element={<Register />}></Route>
            <Route
              path="/api/password/forgot"
              element={<ForgotPassword />}
            ></Route>
            <Route
              path="/api/password/reset/:token"
              element={<ResetPassword />}
            />
            <Route
              path="/api/password/update"
              element={<UpdatePassword />}
            ></Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </CartProviderFunction>
  );
}

export default App;
