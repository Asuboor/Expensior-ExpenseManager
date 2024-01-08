import React, { useState,useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
const Register = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const submitHandler = async (values) => {
    try {
      await axios.post("/api/v1/users/register", values);
      setLoading(true);
      message.success("Registration Successful");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      message.error("Invalid credentials");
      console.log(error);
    }
  };

  //prevension

  useEffect(()=>{
  if(localStorage.getItem("user")){
    navigate("/");
  }
  },[navigate])

  return (
    <>
    <nav className="navbar navbar-expand-lg  bg-dark ">
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
            <Link to="/" className="navbar-brand text-light fs-3 fw-bold">
            <img src="./ex.png" alt="" width="80" />
            </Link>
          </div>
        </div>
      </nav>
      <div className="register-page bg-dark">
        {loading && <Spinner />}
        <div className="register w-25 p-4">
        <div className="title d-flex justify-content-center "><h2>Sign Up</h2></div>
        <Form layout="vertical" onFinish={submitHandler}>
          <Form.Item name="name" label="Name">
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input type="email" />
          </Form.Item>
          <Form.Item name="password" label="Password">
            <Input type="password" />
          </Form.Item>
          <div className="d-flex justify-content-between  fs-5">
            <Link to="/login">Login</Link>
            <button className="btn">Register</button>
          </div>
        </Form>
        </div>
      </div>
    </>
  );
};

export default Register;

