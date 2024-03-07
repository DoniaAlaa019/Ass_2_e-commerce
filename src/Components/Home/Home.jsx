import React, { useEffect, useState } from 'react';
import "../Brands/Brands.css";
import axiso from "axios";
import Loading from '../Loading/Loading';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import image1 from "../../assets/1.jpg";
import image2 from "../../assets/2.jpg";
import image3 from "../../assets/3.jpg";
import image4 from "../../assets/4.jpg";
import image5 from "../../assets/5.jpg";
import HomeProducts from './HomeProducts';
import CartProvider from '../../Context/CartProvider/CartProvider';



const Home = () => {
  const [catagorise, setCatagorise] = useState(null);
  const [loading, setloading] = useState(null);
  async function getcatagories() {
    try {
      setloading(true);
      let { data } = await axiso.get("https://ecommerce.routemisr.com/api/v1/categories");
      setCatagorise(data.data);


    } catch (error) {
      console.log(error);
    }
    setloading(false);
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6
  };
  const settings1 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
  };
  useEffect(() => {
    getcatagories();
  }, [])
  return (
    <>
      {loading ? <div className='position-sticky top-0 w-100 z-2'>
        <div className="position-absolute w-100 z-2"><Loading /></div>
      </div> : ""}
      <div className="container">
        <div className="row">
          <div className="col-md-12  py-5 w-50 d-md-flex flex-md-row justify-content-md-center align-content-md-start mx-auto">
            <div className="col-md-6">
              <div className="slider-container ">
                <Slider {...settings1} >
                  <div>
                    <img src={image1} className='w-100' style={{ height: "400px" }} alt="img" />
                  </div>
                  <div>
                    <img src={image2} className='w-100' style={{ height: "400px" }} alt="img" />
                  </div>
                  <div>
                    <img src={image3} className='w-100' style={{ height: "400px" }} alt="img" />
                  </div>

                </Slider>

              </div>
            </div>
            <div className="col-md-6 " >
              <div>
                <img src={image5} className='w-100' style={{ height: "200px" }} alt="img" />
              </div>
              <div>
                <img src={image4} className='w-100' style={{ height: "200px" }} alt="img" />
              </div>

            </div>
          </div>
          <div className="col-md-12">
            {catagorise == null ? "" :
              <div className="slider-container">
                <Slider {...settings} >
                  {catagorise.map(function (cat, indx) {
                    return <div key={indx}>
                      <img src={cat.image} className='w-100' style={{ height: "250px" }} alt="img" />
                    </div>
                  })}
                </Slider>

              </div>
            }
          </div>
          <div className="col-md-12">
            
          </div>
        </div>
      </div>
      <CartProvider><HomeProducts /></CartProvider>
    </>
  );
};

export default Home;
