import React, { useContext, useEffect, useState } from 'react';
import { authContext } from '../../Context/AuthonificationProvider/AuthoProvider';
import Loading from '../Loading/Loading';
import axiso from "axios";
import { cartContext } from '../../Context/CartProvider/CartProvider';
import toast, { Toaster } from "react-hot-toast";


const WishList = () => {
    let { token, setToken } = useContext(authContext);
    const [loading, setloading] = useState(null);
    const [list, setList] = useState(null);
    let { addCart } = useContext(cartContext);

    async function getwichlist() {
        setloading(true);
        try {
            let { data } = await axiso.get(
                "https://ecommerce.routemisr.com/api/v1/wishlist", {
                headers: {
                    token: token
                }
            }
            );
            if (data.status == 'success') {
                setList(data.data)
            }

        } catch (error) {
            console.log(error.response.data.message);
        }
        setloading(false);
    }
    async function removewichlist(id) {
        setloading(true);
        try {
            let { data } = await axiso.delete(
                `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
                headers: {
                    token: token
                }
            }
            );

            getwichlist();
        } catch (error) {
            console.log(error.response.data.message);
        }
        setloading(false);
    }
    useEffect(() => {
        getwichlist();
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
        <div className='d-flex flex-row justify-content-center align-items-center'>
            <div className="container mx-3 my-5 p-5 bg-body-tertiary ">
                <div className="row">
                    <div className="col-md-12 pb-3">
                        <h3>My Wish List</h3>
                    </div>
                    {list == null ? "" : <>

                        {list.map((item) => <div className="col-md-12 pb-3 border-bottom border-secondary-subtle my-3" key={item._id}>
                            <div className='d-flex flex-row justify-content-between align-items-center w-100'>
                                <div className='d-flex flex-row justify-content-start align-items-center w-50'>
                                    <img src={item['imageCover']} className='w-50 px-2 bg-white' alt="image" />
                                    <div className='mx-3'>
                                        <h5>{item['title'].split(' ').splice(0, 2).join(' ')}</h5>
                                        <p className='text-success'>{item.price} EGP</p>
                                        <div className='text-danger' onClick={() => removewichlist(item.id)} style={{ cursor: "pointer" }}>
                                            <i className="fa-solid fa-trash" style={{ color: "#dc3545" }}></i> Remove
                                        </div>
                                    </div>

                                </div>
                                <button className='btn btn-outline-success p-2' onClick={() => {
                                    addCart(item._id);
                                    removewichlist(item.id);
                                    toast.success("Successfully add in your cart");
                                }}>add To Cart</button>
                            </div>
                        </div>)}
                    </>}


                </div>
            </div>
        </div>
    </>;
}

export default WishList;