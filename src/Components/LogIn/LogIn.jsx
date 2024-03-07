import "./LogIn.css";
import { Link } from "react-router-dom";
import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axiso from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { authContext } from "../../Context/AuthonificationProvider/AuthoProvider";
import Loading from "../Loading/Loading";
const LogIn = () => {
  const [loading, setloading] = useState(null);
  let { token, setToken } = useContext(authContext);
  let navigate = useNavigate();
  let user = {
    email: "",
    password: "",
  };
  let valid = yup.object().shape({
    email: yup
      .string()
      .required("email is required")
      .email("email pattern is inavalid"),
    password: yup
      .string()
      .required("Password is required")
      .matches(/^[A-z]{1}([A-z]|[0-9]){5,8}$/, "password pattern is inavalid"),
  });
  let signUpForm = useFormik({
    initialValues: user,
    onSubmit: function (value) {
      apiSignUp(value);
    },
    validationSchema: valid,
  });
  async function apiSignUp(user) {
    setloading(true);
    try {
      let { data } = await axiso.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        user
      );
      
      if (data.message === "success") {
        toast.success("Successfully SignIn");
        setToken(data.token);
        localStorage.setItem('tkn', data.token)
        setTimeout(function () {
          navigate("/home");
        }, 1000);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setloading(false);
  }
  return (
    <>
      {loading ?
        <>
          <div className="position-relative">
            <div className="position-absolute w-100 top-0"><Loading /></div>
          </div>

        </>
        : ""}


      <div className="container py-5">

        <form onSubmit={signUpForm.handleSubmit}>

          <div className="row g-2">
            <div className="col-md-12">
              {true ? (
                <Toaster position="top-right" reverseOrder={false} />
              ) : (
                ""
              )}
            </div>
            <div className="col-md-12">
              <h2>Log In</h2>
            </div>
            <div className="col-md-12">
              <label htmlFor="email">Email : </label>
            </div>{" "}
            <div className="col-md-12">
              <input
                onChange={signUpForm.handleChange}
                value={signUpForm.values.email}
                type="text"
                id="email"
                className="form-control"
                name="email"
                onBlur={signUpForm.handleBlur}
              />
            </div>{" "}
            <div className="col-md-12">
              {signUpForm.errors.email && signUpForm.touched.email ? (
                <div className="alert alert-danger">
                  {signUpForm.errors.email}
                </div>
              ) : (
                ""
              )}
            </div>{" "}
            <div className="col-md-12">
              <label htmlFor="password">Password : </label>
            </div>{" "}
            <div className="col-md-12">
              <input
                onChange={signUpForm.handleChange}
                value={signUpForm.values.password}
                type="password"
                id="password"
                className="form-control"
                name="password"
                onBlur={signUpForm.handleBlur}
              />
            </div>
            <div className="col-md-12">
              {signUpForm.errors.password && signUpForm.touched.password ? (
                <div className="alert alert-danger">
                  {signUpForm.errors.password}
                </div>
              ) : (
                ""
              )}
            </div>{" "}
            <div className="col-md-12">
              <div className="inner-buttons d-flex flex-row justify-content-between align-items-center my-2">
                <Link to="/forgetPassword" className="text-forget">
                  <h4>Forget your Password ?</h4>
                </Link>

                <button type="submit" className="btn btn-success">
                  {loading ? (
                    <ThreeDots
                      visible={true}
                      height="25"
                      width="25"
                      color="#fff"
                      radius="9"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  ) : (
                    "Login now"
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

    </>
  );
};

export default LogIn;
