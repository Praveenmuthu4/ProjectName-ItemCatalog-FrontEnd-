import React, { Fragment, useContext } from "react";
import Loader from "./Loader";
import HeaderData from "../Layout/HeaderData";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AfterLogin() {
  const { user = {} } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.auth);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <HeaderData title={"Your Profile"} />

          <h2 className="mt-5 ml-5">My Profile</h2>
          <div className="row justify-content-around mt-5 user-info">
            <div className="col-12 col-md-3">
              <figure className="avatar avatar-profile">
                <img
                  className="rounded-circle img-fluid"
                  src={user.avatar.url}
                  alt={user._id}
                />
              </figure>
              <Link
                to="/api/me/update"
                id="edit_profile"
                className="btn btn-primary btn-block my-5"
              >
                Edit Profile
              </Link>
            </div>

            <div className="col-12 col-md-5">
              <h4>Full Name</h4>
              <p>{user.name}</p>

              <h4>Email Address</h4>
              <p>{user.email}</p>

              <h4>Joined On</h4>
              <p>{String(user.createdAt).substring(0, 10)}</p>

              {user.role !== "admin" && (
                <Link
                  to="/api/orders/me"
                  className="btn btn-success btn-block mt-5"
                >
                  My Orders
                </Link>
              )}

              <Link
                to="/api/password/update"
                className="btn btn-success btn-block mt-3"
              >
                Change Password
              </Link>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
