'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/utils/store";
import { removeFromCart, clearCart, selectTotalPrice } from "@/utils/cartSlice";
import { useRouter } from 'next/navigation'

import Breadcrumb from "@/components/Other/Breadcrumb";

import * as Icon from "@phosphor-icons/react/dist/ssr";



const Cart = () => {
  
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const totalPrice = useSelector(selectTotalPrice);
    const dispatch = useDispatch();

    const handleRemoveFromCart = (id: string) => {
      dispatch(removeFromCart(id));
    };

    const handleClearCart = () => {
      dispatch(clearCart());
    };

     const handleCheckout = () => {
       // Save cart items to local storage
       localStorage.setItem("cartItems", JSON.stringify(cartItems));
     };
 

    return (
      <>
        <Breadcrumb heading="Shopping Cart" subHeading="Shopping Cart" />
        <div className="bg-white text-black min-h-screen p-6 w-[80vw] m-auto">
          {cartItems.length === 0 ? (
            <p className="text-xl text-center">Your cart is empty.</p>
          ) : (
            <>
              <div className="space-y-6">
                {cartItems.map((item: any) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between border-b border-gray-300 pb-4 mb-6"
                  >
                    <img
                      src={item.colorImage || "/path/to/placeholder.jpg"}
                      alt={item.colorName}
                      className="w-32 h-32 object-cover rounded-lg shadow-md"
                    />
                    <div className="flex-1 ml-6">
                      <h2 className="text-2xl font-semibold mb-1">
                        {item.colorName}
                      </h2>
                      <p className="text-lg text-gray-600">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveFromCart(item._id)}
                      className="text-red-600 hover:text-red-800 font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-gray-300 pt-4 mt-8">
                <h2 className="text-2xl font-semibold">
                  Total Price: ${totalPrice.toFixed(2)}
                </h2>
                <button
                  onClick={handleClearCart}
                  className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-800 transition-colors duration-300"
                >
                  Clear Cart
                </button>
              </div>

              <div className="flex space-x-4 mt-8">
                <Link
                  onClick={handleCheckout}
                  href="/checkout"
                  className="bg-black text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-800 transition-colors duration-300"
                >
                  Checkout
                </Link>
                <Link
                  href="/"
                  className="bg-gray-200 text-black px-6 py-3 rounded-lg shadow-md hover:bg-gray-300 transition-colors duration-300"
                >
                  Continue Shopping
                </Link>
              </div>
            </>
          )}
        </div>
      </>
    );
}

export default Cart