import React, { Fragment, useContext, useEffect, useState } from "react";
import HeaderData from "../Layout/HeaderData";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loginRequest } from "../actions/authActions";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  const redirect = window.location.search
    ? window.location.search.split("=")[1]
    : "/api/me";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirect);
    }

    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated, error, navigate, redirect]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginRequest(email, password))
      .then(() => {
        navigate(redirect);
      })
      .catch((error) => {
        console.log("Login error:", error);
      });
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
