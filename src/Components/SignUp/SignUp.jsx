import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axiso from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from 'react-loader-spinner';
import Loading from "../Loading/Loading";
const SignUp = () => {
  const [loading, setloading] = useState(null);
  let navigate = useNavigate();
  let user = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };
  let valid = yup.object().shape({
    name: yup
      .string()
      .min(3, "name min length is 3")
      .max(100, "less than 100")
      .required("name is required"),
    email: yup
      .string()
      .required("email is required")
      .email("email pattern is inavalid"),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^[A-z]{1}([A-z]|[0-9]){5,8}$/,
        `must be
    * Start with a letter (either uppercase or lowercase).
    * Be between 6 and 9 characters in total.
    * Can only contain letters (A-Z or a-z) and numbers (0-9)`
      ),
    rePassword: yup
      .string()
      .required("re-Password is required")
      .oneOf([yup.ref("password")], "re-Password pattern is inavalid"),
    phone: yup
      .string()
      .required("Phone is required")
      .matches(/^01[0125][0-9]{8}$/, "invalid Phone"),
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
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        user
      );
      if (data.message == "success") {
        toast.success("Successfully SignUp");
        setTimeout(function () {
          navigate("/logIn");
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
              <h2>register now</h2>
            </div>
            <div className="col-md-12">
              <label htmlFor="name">Name : </label>
            </div>{" "}
            <div className="col-md-12">
              <input
                onChange={signUpForm.handleChange}
                value={signUpForm.values.name}
                type="text"
                id="name"
                className="form-control"
                name="name"
                onBlur={signUpForm.handleBlur}
              />
            </div>{" "}
            <div className="col-md-12">
              {signUpForm.errors.name && signUpForm.touched.name ? (
                <div className="alert alert-danger">
                  {signUpForm.errors.name}
                </div>
              ) : (
                ""
              )}
            </div>{" "}
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
              <label htmlFor="rePassword">Re-password : </label>
            </div>{" "}
            <div className="col-md-12">
              <input
                value={signUpForm.values["rePassword"]}
                onChange={signUpForm.handleChange}
                className="form-control"
                type="password"
                id="rePassword"
                name="rePassword"
                onBlur={signUpForm.handleBlur}
              />
            </div>{" "}
            <div className="col-md-12">
              {signUpForm.errors.rePassword && signUpForm.touched.rePassword ? (
                <div className="alert alert-danger">
                  {signUpForm.errors.rePassword}
                </div>
              ) : (
                ""
              )}
            </div>{" "}
            <div className="col-md-12">
              <label htmlFor="phone">Phone : </label>
            </div>{" "}
            <div className="col-md-12">
              <input
                onChange={signUpForm.handleChange}
                value={signUpForm.values.phone}
                type="tel"
                id="phone"
                className="form-control"
                name="phone"
                onBlur={signUpForm.handleBlur}
              />
            </div>{" "}
            <div className="col-md-12">
              {signUpForm.errors.phone && signUpForm.touched.phone ? (
                <div className="alert alert-danger">
                  {signUpForm.errors.phone}
                </div>
              ) : (
                ""
              )}
            </div>{" "}
            <div className="col-md-12">
              <div className="inner-buttons d-flex flex-row justify-content-end align-items-center my-2">
                <button
                  type="submit"
                  className="btn btn-success py-2 px-3"
                >
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
                    "Register now"
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

export default SignUp;
