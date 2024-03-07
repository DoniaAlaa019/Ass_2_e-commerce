import React, { useContext, useEffect, useState } from 'react';
import Loading from '../Loading/Loading';
import "../Brands/Brands.css";
import "./Products.css";
import axiso from "axios";
import { useNavigate } from "react-router-dom";
import { authContext } from '../../Context/AuthonificationProvider/AuthoProvider';
import { cartContext } from '../../Context/CartProvider/CartProvider';
import toast, { Toaster } from "react-hot-toast";


const Products = () => {
    const [loading, setloading] = useState(null);
    const [products, setProducts] = useState(null);
    const [searchproducts, setSearchProducts] = useState(null);
    const [wishlist, setwishList] = useState(null);
    let { addCart } = useContext(cartContext);

    let [name, setName] = useState('');


    let navigate = useNavigate();
    async function getProducts() {
        try {
            setloading(true);
            let { data } = await axiso.get("https://ecommerce.routemisr.com/api/v1/products");
            setProducts(data.data);
            setSearchProducts(data.data);

        } catch (error) {
            console.log(error);
        }
        setloading(false);
    }
    async function getDetailsProducts(id) {
        try {
            setloading(true);
            navigate(`/product-detail/${id}`);

        } catch (error) {
            console.log(error);
        }
        setloading(false);

    }
    let { token, setToken } = useContext(authContext);
    async function addInWishList(id) {
        try {
            setloading(true);
            let { data } = await axiso.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
                productId: id
            }, {
                headers: {
                    token: token
                }
            });
            getProducts();
            getInWishList();
        } catch (error) {
            console.log(error);
        }
        setloading(false);
    }
    async function getInWishList() {
        try {
            setloading(true);
            let { data } = await axiso.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
                headers: {
                    token: token
                }
            });
            setwishList(data.data);
        } catch (error) {
            console.log(error);
        }
        setloading(false);
    }
    useEffect(() => {
        getProducts();
        getInWishList();

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
        <div className='container my-5'>
            <div className="row">
                <div className="col-md-12 ">
                    <div className="col-md-8 mx-auto text-center">
                        <input type="search" id="search" name="search" placeholder='search....' className='form-control' onChange={(e) => setName(e.target.value)} />
                    </div>
                </div>
                {searchproducts == null ? "" : <> {products.filter((item) => { return name.toLowerCase() === '' ? item : item.title.toLowerCase().includes(name) }).map((product, index) => <div className="col-md-3" key={product._id}>
                    <div className="inneritem px-4 py-5 tran-card rounded-2">
                        <div onClick={() => {
                            getDetailsProducts(product._id)
                        }}>
                            <img src={product.imageCover} alt="image" className='w-100 py-5' />
                            <h6 style={{ color: "#4fa74f" }} className='pt-3'>{product.category.name}</h6>
                            <h6>{product.title.split(' ').splice(0, 2).join(' ')}</h6>
                            <div className='d-flex flex-row justify-content-between align-align-items-center py-3 fw-semibold'>
                                <p>{product.price} EGp</p>
                                <div>
                                    <i className="fa-solid fa-star" style={{ color: "#FFD43B" }}></i>
                                    {product.ratingsAverage}
                                </div>
                            </div>
                        </div>
                        {wishlist == null ? "" : <>

                            {wishlist.filter((item) => { return item.id !== product.id ? "" : 1 }).length == 0 ? <i onClick={() => addInWishList(product.id)} className="fa-solid fa-heart fs-3 d-flex flex-row justify-content-end m-0" style={{ color: "#000000", cursor: "pointer" }}></i> : <i className="fa-solid fa-heart fs-3 d-flex flex-row justify-content-end m-0" style={{ color: "red", cursor: "pointer" }} ></i>}



                        </>}

                        <button onClick={()=>{
                            addCart(product._id);
                            toast.success("Successfully add in your cart");
                        }}>+ Add</button>
                    </div>
                </div>)}</>}
            </div>
        </div>
    </>;
}


export default Products;