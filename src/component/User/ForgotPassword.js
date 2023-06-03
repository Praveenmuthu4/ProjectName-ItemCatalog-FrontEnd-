import React, { Fragment, useState } from "react";
import HeaderData from "../Layout/HeaderData";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  return (
    <Fragment>
      <HeaderData title={"Forgot Password"} />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg">
            {/* onSubmit={submitHandler}> */}
            <h1 className="mb-3">Forgot Password</h1>
            <div className="form-group">
              <label htmlFor="email_field">Enter Your Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              id="forgot_password_button"
              type="submit"
              className="btn btn-block py-3"
              //   disabled={loading ? true : false}
            >
              Send Email
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
