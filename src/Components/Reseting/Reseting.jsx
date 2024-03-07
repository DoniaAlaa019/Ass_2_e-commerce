import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axiso from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import Loading from "../Loading/Loading";
const Reseting = () => {
  const [loading, setloading] = useState(null);
  let navigate = useNavigate();
  let user = {
    email: "",
    newPassword: "",
  };
  let valid = yup.object().shape({
    email: yup
      .string()
      .required("email is required")
      .email("email pattern is inavalid"),
    newPassword: yup
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
      let { data } = await axiso.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",user);
      
      if (data.token) {
        toast.success("Successfully Reset Password");
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
              <h2>reset your account password</h2>
            </div>
            <div className="col-md-12">
              <div className="form-floating mb-3">
                <input
                  onChange={signUpForm.handleChange}
                  value={signUpForm.values.email}
                  onBlur={signUpForm.handleBlur}
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email"
                />
                <label htmlFor="email">Email</label>
              </div>{" "}
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
              <div className="form-floating mb-3">
                <input
                  onChange={signUpForm.handleChange}
                  value={signUpForm.values.newpassword}
                  onBlur={signUpForm.handleBlur}
                  type="password"
                  className="form-control"
                  id="newPassword"
                  placeholder="Password"
                />
                <label htmlFor="newPassword">Password</label>
              </div>{" "}
            </div>{" "}
            <div className="col-md-12">
              {signUpForm.errors.newPassword && signUpForm.touched.newPassword ? (
                <div className="alert alert-danger">
                  {signUpForm.errors.newPassword}
                </div>
              ) : (
                ""
              )}
            </div>{" "}
            <div className="col-md-12">
              <div className="inner-buttons  my-2">
                <button
                  type="submit"
                  className="btn btn-success py-2 px-4"
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
                    "Reset password"
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

export default Reseting;
