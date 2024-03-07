import "../LogIn/LogIn.css";
import { Link } from "react-router-dom";
import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axiso from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate , useParams } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { authContext } from "../../Context/AuthonificationProvider/AuthoProvider";
import Loading from "../Loading/Loading";
import { cartContext } from "../../Context/CartProvider/CartProvider";

const Checkout = () => {
    let { id } = useParams();
    const [loading, setloading] = useState(null);
    let { token, setToken } = useContext(authContext);
    let { clearCart } = useContext(cartContext);
    let nav = useNavigate();
    let user = {
        details: "",
        phone: "",
        city: ""

    };
    let valid = yup.object().shape({
        details: yup
            .string()
            .required("email is required"),
        phone: yup
            .string()
            .required("Phone is required")
            .matches(/^01[0125][0-9]{8}$/, "invalid Phone"),
        city: yup
            .string()
            .required("Password is required"),
    });
    let signUpForm = useFormik({
        initialValues: user,
        onSubmit: function (value) {
            payment(value);
        },
        validationSchema: valid,
    });
    async function payment(user) {
        setloading(true);
        try {
            let { data } = await axiso.post(
                `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`,
                {
                    shippingAddress: {
                        details: user.details,
                        phone: user.phone,
                        city: user.city
                    }
                }, {
                    headers: {
                        token: localStorage.getItem('tkn')
                    }
                }
            );
            if (data.status == "success") {
                toast.success("Successfully CheckOut");
                window.location.assign("https://checkout.stripe.com/c/pay/cs_test_a1ACFLacGVPTIajZpkjGTCKkfbgtNszZxhEImOwzcxulx4wDNPB1Hy1tEd#fidkdWxOYHwnPyd1blpxYHZxWjA0SHViYl1ANVYyU2pOX2hVVW9ASmZBUElpa2FLVnBUQGo2UFduUEhIXHx9aEhjanBGZ1NxZ3RKNVVtXWxcSTJ8Qzx2aWZkUEBpMXJCXVRHTkIxZzBSZmhENTUxYHVKMUpQVycpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl")
                clearCart();
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
        setloading(false);
    }
    return <>

        {loading ?
            <>
                <div className="position-relative">
                    <div className="position-absolute w-100 top-0"><Loading /></div>
                </div>

            </>
            : ""}


        <div className="container py-5 w-75">

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
                        <label htmlFor="details">Details  </label>
                    </div>{" "}
                    <div className="col-md-12">
                        <input
                            onChange={signUpForm.handleChange}
                            value={signUpForm.values.details}
                            type="text"
                            id="details"
                            className="form-control"
                            name="details"
                            onBlur={signUpForm.handleBlur}
                        />
                    </div>{" "}
                    <div className="col-md-12">
                        {signUpForm.errors.details && signUpForm.touched.details ? (
                            <div className="alert alert-danger">
                                {signUpForm.errors.details}
                            </div>
                        ) : (
                            ""
                        )}
                    </div>{" "}
                    <div className="col-md-12">
                        <label htmlFor="phone">phone  </label>
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
                    </div>
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
                        <label htmlFor="city">City  </label>
                    </div>{" "}
                    <div className="col-md-12">
                        <input
                            onChange={signUpForm.handleChange}
                            value={signUpForm.values.city}
                            type="text"
                            id="city"
                            className="form-control"
                            name="city"
                            onBlur={signUpForm.handleBlur}
                        />
                    </div>
                    <div className="col-md-12">
                        {signUpForm.errors.city && signUpForm.touched.city ? (
                            <div className="alert alert-danger">
                                {signUpForm.errors.city}
                            </div>
                        ) : (
                            ""
                        )}
                    </div>{" "}
                    <div className="col-md-12">

                        <button type="submit" className="btn btn-outline-info my-2 w-100">
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
                                "Pay now"
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>

    </>;
}



export default Checkout;