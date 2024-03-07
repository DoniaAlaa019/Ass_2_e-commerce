import React, { useContext, useEffect, useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axiso from "axios";
import { useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';
import "./Products.css";
import { authContext } from '../../Context/AuthonificationProvider/AuthoProvider';
import { cartContext } from '../../Context/CartProvider/CartProvider';
import toast, { Toaster } from "react-hot-toast";


const DetailsProduct = () => {
    let { id } = useParams();
    const [loading, setloading] = useState(null);
    const [detailsProducts, setDetailsProducts] = useState(null);
    const [slides, setSlides] = useState([]);
    let { addCart } = useContext(cartContext);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        lazyLoad: true,
        arrows: false
    };
    async function getDetailsProducts(id) {
        try {
            setDetailsProducts(null);
            setloading(true);
            let { data } = await axiso.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
            setDetailsProducts(data.data);
            setSlides(data.data.images)
        } catch (error) {
            console.log(error);
        }
        setloading(false);

    }
    let { token, setToken } = useContext(authContext);
    async function addInWishList(id) {
        try {
            setloading(true);
            let { data } = await axiso.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
                productId:id
            },{
                headers:{
                    token: token
                }
            });
        } catch (error) {
            console.log(error);
        }
        setloading(false);
    }
    useEffect(() => {
        getDetailsProducts(id);
    }, [])
    return <>
        {loading ? <div className='position-sticky top-0 w-100 z-2'>
            <div className="position-absolute w-100 z-2"><Loading /></div>
        </div> : ""}
        {true ? (
                <Toaster position="top-right" reverseOrder={false} />
              ) : (
                ""
              )}
        <div className="container pt-0">
            <div className="row g-0 d-flex flex-row align-items-center justify-content-center vh-100">
                <div className="col-md-4">
                    <div className="slider-container">
                        <Slider {...settings} >
                            {slides.map(function (slide, indx) {
                             return <div key={indx} className=''>
                                       <img src={slide} className='w-100' style={{height:"500px"}} alt="img" />
                                    </div>
                            })}
                        </Slider>
                    </div>
                </div>
                <div className="col-md-8 d-flex flex-column justify-content-center">
                    {detailsProducts == null ? "" : <div className="innerProdcut d-flex flex-column justify-content-center">
                        <h3>{detailsProducts.title}</h3>
                        <p>{detailsProducts.description}</p>
                        <div className='d-flex flex-row justify-content-between align-align-items-center py-3 fw-semibold'>
                            <p>{detailsProducts.price} EGp</p>
                            <div>
                                <i className="fa-solid fa-star" style={{ color: "#FFD43B" }}></i>
                                {detailsProducts.ratingsAverage}
                            </div>
                        </div>
                        <i className="fa-solid fa-heart fs-3 d-flex flex-row justify-content-end m-0" style={{ color: "#000000" , cursor:"pointer" }} onClick={()=>addInWishList(detailsProducts.id)}></i>
                        <button className='addInDetails my-3' onClick={()=>{
                            addCart(detailsProducts._id);
                            toast.success("Successfully add in your cart");
                        }}>+ Add</button>
                    </div>}

                </div>
            </div>
        </div>
    </>;
}


export default DetailsProduct;