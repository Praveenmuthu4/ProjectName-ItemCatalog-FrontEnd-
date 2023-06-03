import React, { Fragment, useContext, useEffect, useState } from "react";
import HeaderData from "../Layout/HeaderData";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/userContext";
import Loader from "../Layout/Loader";

export default function Login() {
  const { loading, handleLogin } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  return (
    <Fragment>
      <HeaderData title={"Login"} />
      {loading ? (
        <Loader />
      ) : (
        <div className="row wrapper">
          <div className="col-10 col-lg-5">
            <form className="shadow-lg" onSubmit={handleSubmit}>
              <h1 className="mb-3">Login</h1>
              <div className="form-group">
                <label htmlFor="email_field">Email</label>
                <input
                  type="email"
                  id="email_field"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password_field">Password</label>
                <input
                  type="password"
                  id="password_field"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Link to="/api/password/forgot" className="float-right mb-4">
                Forgot Password?
              </Link>

              <button
                id="login_button"
                type="submit"
                className="btn btn-block py-3"
              >
                LOGIN
              </button>

              <Link to="/api/register" className="float-right mt-3">
                New User?
              </Link>
            </form>
          </div>
        </div>
      )}
    </Fragment>
  );
}
