import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Home from "./Components/Home/Home";
import NotFound from "./Components/NotFound/NotFound";
import Cart from "./Components/Cart/Cart";
import Layout from "./Components/Layout/Layout";
import WishList from "./Components/WishList/WishList";
import Catagories from "./Components/Catagories/Catagories";
import Brands from "./Components/Brands/Brands";
import Products from "./Components/Products/Products";
import LogIn from "./Components/LogIn/LogIn";
import SignUp from "./Components/SignUp/SignUp";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import Verification from "./Components/Verification/Verification";
import Reseting from "./Components/Reseting/Reseting";
import AuthoProvider from "./Context/AuthonificationProvider/AuthoProvider";
import Navbar from "./Components/Navbar/Navbar";
import ProtectedRouter from "./Components/ProtectedRouter/ProtectedRouter";
import DetailsProduct from "./Components/Products/DetailsProduct";
import Checkout from "./Components/Checkout/Checkout";
import CartProvider from "./Context/CartProvider/CartProvider";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "home",
        element: <div className="position-relative">
          <div className='sticky z-1'>

            <AuthoProvider>
              <CartProvider><Navbar /></CartProvider>
              <ProtectedRouter>
                <CartProvider><Home /></CartProvider>
              </ProtectedRouter>
            </AuthoProvider>

          </div>
        </div>,
      },
      {
        path: "cart",
        element: <div className="position-relative">
          <div className='sticky z-1'>
            <>
              <AuthoProvider>
                <CartProvider><Navbar /></CartProvider>
                <ProtectedRouter><CartProvider><Cart /></CartProvider></ProtectedRouter>
              </AuthoProvider>
            </>
          </div>
        </div>,
      },
      {
        path: "checkout/:id",
        element: <div className="position-relative">
          <div className='sticky z-1'>

            <AuthoProvider>
              <CartProvider><Navbar /></CartProvider>
              <ProtectedRouter><CartProvider><Checkout /></CartProvider></ProtectedRouter>
            </AuthoProvider>

          </div>
        </div>,
      },
      {
        path: "wishList",
        element: <div className="position-relative">
          <div className='sticky z-1'>
            <>
              <AuthoProvider>
                <CartProvider><Navbar /></CartProvider>
                <ProtectedRouter><CartProvider><WishList /></CartProvider></ProtectedRouter>
              </AuthoProvider>
            </>
          </div>
        </div>,
      },
      {
        path: "product-detail/:id",
        element: <div className="position-relative">
          <div className='sticky z-1'>
            <>
              <AuthoProvider>
                <CartProvider><Navbar /></CartProvider>
                <ProtectedRouter><CartProvider><DetailsProduct /></CartProvider></ProtectedRouter>

              </AuthoProvider>
            </>
          </div>
        </div>,
      },
      {
        path: "catagories",
        element: <div className="position-relative">
          <div className='sticky z-1'>
            <AuthoProvider>
              <CartProvider><Navbar /></CartProvider>
              <ProtectedRouter>
                <Catagories />
              </ProtectedRouter>

            </AuthoProvider>
          </div>
        </div>,
      },
      {
        path: "brands",
        element: <div className="position-relative">
          <div className='sticky z-1'>
            <AuthoProvider>
              <CartProvider><Navbar /></CartProvider>
              <ProtectedRouter><Brands /></ProtectedRouter>

            </AuthoProvider>
          </div>
        </div>,
      },
      {
        path: "products",
        element: <div className="position-relative">
          <div className='sticky z-1'>
            <AuthoProvider>
              <CartProvider><Navbar /></CartProvider>
              <ProtectedRouter><CartProvider><Products /></CartProvider></ProtectedRouter>

            </AuthoProvider>
          </div>
        </div>,
      },
      {
        path: "/",
        element: <div className="position-relative">
          <div className='sticky z-1'>
            <AuthoProvider>
              <CartProvider><Navbar /></CartProvider>
              {localStorage.getItem('tkn') ? <Home /> : <LogIn />}
            </AuthoProvider>
          </div>
        </div>,
      },
      {
        path: "signUp",
        element: <div className="position-relative">
          <div className='sticky z-1'>
            <AuthoProvider>
              <CartProvider><Navbar /></CartProvider>
              <SignUp />
            </AuthoProvider>
          </div>
        </div>,
      },
      {
        path: "forgetPassword",
        element: <div className="position-relative">
          <div className='sticky z-1'>
            <AuthoProvider>
              <CartProvider><Navbar /></CartProvider>
              <ForgetPassword />
            </AuthoProvider>
          </div>
        </div>,
      },
      {
        path: "verify-code",
        element: <div className="position-relative">
          <div className='sticky z-1'>
            <AuthoProvider>
              <CartProvider><Navbar /></CartProvider>
              <Verification />
            </AuthoProvider>
          </div>
        </div>,
      },
      {
        path: "reset-password",
        element: <div className="position-relative">
          <div className='sticky z-1'>
            <AuthoProvider>
              <CartProvider><Navbar /></CartProvider>
              <Reseting />
            </AuthoProvider>
          </div>
        </div>,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
