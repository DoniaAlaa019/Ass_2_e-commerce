import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../../Context/AuthonificationProvider/AuthoProvider";
import { cartContext } from "../../Context/CartProvider/CartProvider";

const Navbar = () => {
  const { token, setToken } = useContext(authContext);
  let { getCart, countCart } = useContext(cartContext);
  let navigate = useNavigate();
  function logOut() {
    setToken(null);
    localStorage.removeItem('tkn');
    navigate("/");
  }

  useEffect(() => {
    setInterval(() => {
    getCart()
    }, 1000);

  }, [])
  return (
    <>
      <div className="position-sticky top-0 z-3">
        {" "}
        <nav className="navbar navbar-expand-lg bg-body-tertiary ">
          <div className="container">
            <Link to="/home" className="navbar-brand">
              <i
                className="fa-solid fa-cart-shopping me-2"
                style={{ color: "#4fa74f", fontSize: "30px" }}
              ></i>
              <span style={{ fontSize: "27px" }}>fresh cart</span>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >


              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                {token ?
                  <>
                    <li className="nav-item">
                      <Link to="/home" className="nav-link " aria-current="page">
                        Home
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/cart" className="nav-link">
                        Cart
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/wishList" className="nav-link">
                        wish list
                      </Link>
                    </li>{" "}
                    <li className="nav-item">
                      <Link to="/products" className="nav-link">
                        Products
                      </Link>
                    </li>{" "}
                    <li className="nav-item">
                      <Link to="/catagories" className="nav-link">
                        catagories
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/brands" className="nav-link">
                        brands
                      </Link>
                    </li>
                  </>
                  :
                  ""
                }

              </ul>
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                {token ?
                  <> <li className="nav-item d-flex flex-row justify-content-center">
                    <Link
                      to="/cart"
                      className="nav-link   position-relative mx-2"
                      aria-current="page"
                    >
                      <i
                        className="fa-solid fa-cart-shopping"
                        style={{ color: "#000000a6", fontSize: "25px" }}
                      ></i>
                      <span
                        className="badge position-absolute bottom-50 start-50 mb-1 ms-1"
                        style={{ backgroundColor: "#4fa74f", fontSize: "11px" }}
                      >
                        
                        {countCart == null ? 0 : countCart}
                      </span>
                    </Link>
                  </li>
                    <li className="nav-item d-flex flex-row justify-content-center">
                      <span style={{ cursor: "pointer" }} className="nav-link" onClick={function () { logOut() }}>
                        Log out
                      </span>
                    </li>
                  </>
                  : ""}



                {token ? "" : <>
                  <li className="nav-item">
                    <Link to="/" className="nav-link " aria-current="page">
                      LogIn
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/signUp" className="nav-link">
                      SignUp
                    </Link>
                  </li></>}

              </ul>
            </div>
          </div>
        </nav>

      </div>
    </>
  );
};

export default Navbar;
