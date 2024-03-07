import React, { useState } from "react";
import { useFormik } from "formik";
import axiso from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import Loading from "../Loading/Loading";
const Verification = () => {
  const [loading, setloading] = useState(null);
  let navigate = useNavigate();
  let user = {
    resetCode: "",
  };

  let signUpForm = useFormik({
    initialValues: user,
    onSubmit: function (value) {
      apiSignUp(value);
    },
  });
  async function apiSignUp(user) {
    setloading(true);
    try {
      let { data } = await axiso.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        user
      );
      if (data.status == "Success") {
        toast.success("verified");
        setTimeout(function () {
          navigate("/reset-password");
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
                  value={signUpForm.values.resetCode}
                  onBlur={signUpForm.handleBlur}
                  type="text"
                  className="form-control"
                  id="resetCode"
                  placeholder="Code"
                />
                <label htmlFor="resetCode">Code</label>
              </div>{" "}
            </div>{" "}
            <div className="col-md-12">
              {signUpForm.errors.resetCode && signUpForm.touched.resetCode ? (
                <div className="alert alert-danger">
                  {signUpForm.errors.resetCode}
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
                    "Verify"
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

export default Verification;
