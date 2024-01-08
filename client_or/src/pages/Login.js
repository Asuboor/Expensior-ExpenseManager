import React, { useEffect, useState } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/v1/users/login", values);
      console.log(data);
      message.success("Login Successful");
      setLoading(false);
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error("Invalid Email or Password");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
    <nav className="navbar navbar-expand-lg bg-dark">
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
            <Link to="/" className="navbar-brand text-light  fs-3 fw-bold">
            <img src="./ex.png" alt="" width="80" /> 
            </Link>
          </div>
        </div>
      </nav>
      <div className="register-page bg-dark ">
        {loading && <Spinner />}
        <div className="register w-25 p-4 ">
        <div className="title d-flex justify-content-center "><h2>Login</h2></div>
          <Form layout="vertical" onFinish={submitHandler}>
            <Form.Item name="email" label="Email" className="emailcss ">
              <Input type="email" />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <Input type="password" />
            </Form.Item>
            <div className="d-flex justify-content-between fs-5">
              <Link to="/register">Register here</Link>
              <button className="btn ">Login</button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
