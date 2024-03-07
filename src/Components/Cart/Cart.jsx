import React, { useContext, useEffect, useState } from 'react';
import { authContext } from '../../Context/AuthonificationProvider/AuthoProvider';
import Loading from '../Loading/Loading';
import axiso from "axios";
import { useNavigate } from "react-router-dom";
import { cartContext } from '../../Context/CartProvider/CartProvider';


const Cart = () => {
    let { token, setToken } = useContext(authContext);
    let { cart, getCart , setCart , setCountCart , inc , dec , clearCart} = useContext(cartContext);

    let navigate = useNavigate();


    function checkoutnavigator(id) {
        navigate(`/checkout/${id}`);
    }
    async function removeProductFromCart(id) {
        try {
            let response = await axiso.delete(
                `https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
                headers: {
                    token: token
                }
            }
            );
            getCart();
            setCountCart(cart.data.numOfCartItems);
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        try {
            getCart();
        } catch (error) {
            console.log(error);
        }
            
    }, [])
    return <>

        <div className='d-flex flex-row justify-content-center align-items-center'>
            <div className="container mx-3 my-5 p-5 bg-body-tertiary ">
                <div className="row">
                    <div className="col-md-12 pb-3">
                        <div className='d-flex flex-row justify-content-between align-items-md-center'>
                            <h2 className="fw-semibold fs-1">Cart Shop</h2>
                            <button className='btn btn-primary px-2 py-2 fs-5' onClick={()=>checkoutnavigator(cart.data._id)}>Check out</button>
                        </div>

                    </div>
                    {cart == null ?
                        <h2 className="fw-semibold fs-2">your cart is empty</h2> : <>
                            <div className="col-md-12">
                                <div className='d-flex flex-row justify-content-between align-items-center'>
                                    <h5>total price: <span style={{ color: "#4fa74f" }}>{cart.data.totalCartPrice}</span></h5>
                                    <h5>total number of items:  <span style={{ color: "#4fa74f" }}>{cart.numOfCartItems}</span></h5>
                                </div>
                            </div>
                            {cart.data.products.map((item) => <div className="col-md-12 pb-3 border-bottom border-secondary-subtle my-3" key={item._id}>
                                <div className='d-flex flex-row justify-content-between align-items-center w-100'>
                                    <div className='d-flex flex-row justify-content-start align-items-center w-50'>
                                        <img src={item.product.imageCover} className='w-50 px-2 bg-white' alt="image" />
                                        <div className='mx-3'>
                                            <h5>{item.product.title.split(' ').splice(0, 2).join(' ')}</h5>
                                            <p className='text-success'>{item.price} EGP</p>
                                            <div className='text-danger' style={{ cursor: "pointer" }} onClick={function () { removeProductFromCart(item.product._id) }}>
                                                <i className="fa-solid fa-trash" style={{ color: "#dc3545" }} ></i> Remove
                                            </div>
                                        </div>

                                    </div>
                                    <div className='d-flex flex-row justify-content-center align-items-center'>
                                        <button className='btn btn-outline-success mx-2' onClick={function(){
                                            inc(item.product._id, item.count)
                                        }}>+</button>
                                        <p className='fs-5 mx-2 mt-3'>{item.count}</p>
                                        <button className='btn btn-outline-success mx-2'  onClick={function(){
                                            dec(item.product._id, item.count)
                                        }}>-</button>
                                    </div>

                                </div>
                            </div>)}

                            <div className="col-md-12">
                                <div className='d-flex flex-row justify-content-center'>
                                    <button className='btn btn-outline-success p-2 text-black fs-5 px-3 py-2' onClick={function () { clearCart() }}>Clear Your Cart</button>
                                </div>
                            </div>
                        </>
                    }


                </div>
            </div>
        </div>
    </>;
}


export default Cart;