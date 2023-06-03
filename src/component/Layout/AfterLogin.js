import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/userContext";
import Loader from "./Loader";

export default function AfterLogin() {
  const { user, handleLogout } = useContext(AuthContext);
  const [dashboardUser, setDashboardUser] = useState();

  useEffect(() => {
    setDashboardUser(user);

    console.log(user);
  }, [user]);

  if (!dashboardUser) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  return (
    <>
      <h2>Shopping Cart</h2>
      <div>
        <div>Welcome, {dashboardUser.name}!</div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </>
  );
}
