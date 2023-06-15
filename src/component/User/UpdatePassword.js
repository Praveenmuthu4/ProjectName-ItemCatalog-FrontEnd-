import React, { Fragment, useEffect, useState } from "react";
import HeaderData from "../Layout/HeaderData";
import { UPDATE_PASSWORD_SUCCESS } from "../constants/userConstants";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { clearErrors, updatePassword } from "../actions/authActions";

export default function UpdatePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, isUpdated, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Password updated successfully");
      navigate("/api/me");
    }
  }, [dispatch, error, isUpdated, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    const passwords = {
      oldPassword,
      password,
    };

    dispatch(updatePassword(passwords));
  };

  return (
    <Fragment>
      <HeaderData title={"Change Password"} />
      <ToastContainer position="bottom-center" autoClose={1000} />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mt-2 mb-5">Update Password</h1>
            <div className="form-group">
              <label htmlFor="old_password_field">Old Password</label>
              <input
                type="password"
                id="old_password_field"
                className="form-control"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="new_password_field">New Password</label>
              <input
                type="password"
                id="new_password_field"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn update-btn btn-block mt-4 mb-3"
              disabled={loading}
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
