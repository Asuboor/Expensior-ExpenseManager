import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { message } from "antd";

const Header = () => {
  const navigate=useNavigate();
  const [loginUser, setLoginUser] = useState("");

  useEffect(() => {
    //parsing the local storage and getting user attribute
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
    }
  }, []);
  
  const logoutHandler=()=>{
    //removing user info from local storage
    localStorage.removeItem("user");
    message.success("Logout Successfull")
    navigate('/login')
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark ">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand text-light fw-bold fs-3 p-2">
              <img src="./ex.png" alt="" width="90" />
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <p className="nav-link text-light fs-4 p-2 ">{loginUser && loginUser.name}</p>
              </li>
              <li className="nav-item p-1">
                <button
                  className="btn btn-primary p-2"
                  onClick={logoutHandler}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
