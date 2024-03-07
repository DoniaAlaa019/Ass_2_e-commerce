import React, { createContext, useContext, useState } from "react";
import { authContext } from "../AuthonificationProvider/AuthoProvider";
import axiso from "axios";

export let cartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(null);
    const [countCart, setCountCart] = useState(null);
    let { token } = useContext(authContext);

    async function getCart() {
        try {
            let { data } = await axiso.get(
                "https://ecommerce.routemisr.com/api/v1/cart", {
                headers: {
                    token: localStorage.getItem('tkn')
                }
            }
            );
            if (data.status == 'success') {
                setCountCart(data.numOfCartItems);
                setCart(data);
            }

        } catch (error) {
            console.log(error.response.data.message);
        }
    }



    async function incrCountCart(id, count) {
        count = count + 1;
        try {
            let { data } = await axiso.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
                count: count
            }, {
                headers: {
                    token: token
                }
            }
            );
            if (data.status == 'success') {
                getCart();
            }

        } catch (error) {
            console.log(error.response.data.message);
        }
    }
    async function decrCountCart(id, count) {
        count = count - 1;
        try {
            let { data } = await axiso.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
                count: count
            }, {
                headers: {
                    token: token
                }
            }
            );
            if (data.status == 'success') {
                getCart();
            }

        } catch (error) {
            console.log(error.response.data.message);
        }
    }
    async function addCart(productId) {
        try {
            let { data } = await axiso.post(
                "https://ecommerce.routemisr.com/api/v1/cart", {
                productId: productId
            }, {
                headers: {
                    token: token
                }
            }
            );
            if (data.status == 'success') {
                setCountCart(data.numOfCartItems);
                getCart();

            }

        } catch (error) {
            console.log(error.response.data.message);
        }
    }
    async function clearCart() {
        try {
            if (cart) {
                let { data } = await axiso.delete(
                    `https://ecommerce.routemisr.com/api/v1/cart`, {
                    headers: {
                        token: token
                    }
                }
                );
                setCart(null);
                setCountCart(0);
            }

        } catch (error) {
            console.log(error.response.data.message);
        }
    }
    return (
        <>
            <cartContext.Provider value={{ cart: cart, getCart: getCart, setCart: setCart, addCart: addCart, inc: incrCountCart, dec: decrCountCart, countCart: countCart  , clearCart:clearCart}}>
                {children}
            </cartContext.Provider>
        </>
    );
};

export default CartProvider;
