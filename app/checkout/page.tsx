"use client";
import React, { useState } from "react";
import Breadcrumb from "@/components/Other/Breadcrumb";
import { useSearchParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/utils/store";
import { selectTotalPrice, clearCart } from "@/utils/cartSlice"; // Import the clearCart action
import { useRouter } from "next/navigation"; // Import useRouter for redirection

const Checkout = () => {

  const searchParams = useSearchParams();
  const discount = searchParams.get("discount") || "0";
  const ship = searchParams.get("ship") || "0";
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalPrice = useSelector(selectTotalPrice);
  const dispatch = useDispatch(); // Initialize dispatch
  const router = useRouter(); // Initialize useRouter for redirection

  // State to manage form data, toast notification, and loading indicator
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    city: "",
    street: "",
    state: "",
    postalCode: "",
    note: "",
  });
  const [toast, setToast] = useState({ message: "", isVisible: false });
  const [loading, setLoading] = useState(false); // State for loading indicator

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Show loading indicator

    // Combine form data and cart items
    const orderData = {
      ...formData,
      cartItems,
      totalPrice,
    };

    try {
      // Post data to backend
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        // Show success toast
        setToast({
          message: "Your order is received. We will contact you shortly!",
          isVisible: true,
        });

        // Clear the cart
        dispatch(clearCart());

        // Redirect to home page after 2 seconds
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        // Handle error response
        console.error("Failed to submit order");
       
      }
    } catch (error) {
      console.error("Error submitting order:", error);
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  // Check if cart is empty
  const isCartEmpty = cartItems.length === 0;

  return (
    <>
      {/* Toast notification */}
      {toast.isVisible && (
        <div className="toast bg-green-500 text-white p-4 rounded-lg fixed top-5 left-1/2 transform -translate-x-1/2 z-50">
          {toast.message}
        </div>
      )}

      {/* Loading Indicator */}
      {loading && (
        <div className="loading-indicator fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="spinner border-t-4 border-black border-solid w-16 h-16 rounded-full animate-spin"></div>
          <div className="text-center mt-2">Loading...</div>
        </div>
      )}

      <Breadcrumb heading="Checkout" subHeading="Checkout" />
      <div className="cart-block md:py-20 py-10">
        <div className="container">
          <div className="content-main flex justify-between">
            <div className="left w-1/2">
              <div className="information mt-5">
                <div className="heading5">Information</div>
                <div className="form-checkout mt-5">
                  <form
                    onSubmit={handleSubmit}
                    className="p-5 border border-line rounded-lg"
                  >
                    <div className="grid sm:grid-cols-2 gap-4 gap-y-5 flex-wrap">
                      {/* Form Fields */}
                      <div>
                        <input
                          className="border-line px-4 py-3 w-full rounded-lg"
                          id="firstName"
                          type="text"
                          placeholder="First Name *"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <input
                          className="border-line px-4 py-3 w-full rounded-lg"
                          id="lastName"
                          type="text"
                          placeholder="Last Name *"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <input
                          className="border-line px-4 py-3 w-full rounded-lg"
                          id="email"
                          type="email"
                          placeholder="Email *"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <input
                          className="border-line px-4 py-3 w-full rounded-lg"
                          id="phoneNumber"
                          type="tel"
                          placeholder="Phone Number *"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <input
                          className="border-line px-4 py-3 w-full rounded-lg"
                          id="street"
                          type="text"
                          placeholder="Street Address *"
                          value={formData.street}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <input
                          className="border-line px-4 py-3 w-full rounded-lg"
                          id="city"
                          type="text"
                          placeholder="City *"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <input
                          className="border-line px-4 py-3 w-full rounded-lg"
                          id="state"
                          type="text"
                          placeholder="State *"
                          value={formData.state}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <input
                          className="border-line px-4 py-3 w-full rounded-lg"
                          id="postalCode"
                          type="text"
                          placeholder="Postal Code *"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-span-full">
                        <textarea
                          className="border border-line px-4 py-3 w-full rounded-lg"
                          id="note"
                          placeholder="Write note..."
                          value={formData.note}
                          onChange={handleInputChange}
                        ></textarea>
                      </div>
                    </div>
                    <div className="payment-block md:mt-10 mt-6">
                      <div className="heading5">Choose payment Option:</div>
                      <div className="list-payment mt-5">
                        <div className="type bg-surface p-5 border border-line rounded-lg">
                          <input
                            className="cursor-pointer"
                            type="radio"
                            id="delivery"
                            name="payment"
                            defaultChecked
                          />
                          <label
                            className="text-button pl-2 cursor-pointer"
                            htmlFor="delivery"
                          >
                            Cash on delivery
                          </label>
                          <div className="infor">
                            <div className="text-on-surface-variant1 pt-4">
                              Pay with cash upon delivery.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="block-button md:mt-10 mt-6">
                      <button
                        type="submit"
                        className={`button-main w-full ${
                          isCartEmpty ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={isCartEmpty}
                      >
                        Payment
                      </button>
                      {isCartEmpty && (
                        <p className="text-red-500 mt-2">
                          Your cart is empty. Please add items to your cart
                          before proceeding.
                        </p>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="right w-5/12">
              <div className="checkout-block">
                <div className="heading5 pb-3">Your Order</div>
                <div className="list-product-checkout">
                  {cartItems.map((item: any) => (
                    <div
                      key={item._id}
                      className="product-item py-3 flex items-center border-b border-line"
                    >
                      <div className="image">
                        <img
                          className="w-24 h-24 object-cover"
                          src={item.colorImage}
                          alt={item.colorName}
                        />
                      </div>
                      <div className="content ml-4 flex-1">
                        <div className="text-title">{item.colorName}</div>
                        <div className="text-title text-button">
                          ${item.price}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="checkout-total mt-5">
                  <div className="total-block py-5 flex justify-between border-b border-line">
                    <div className="text-title">Total</div>
                    <div className="text-title">${totalPrice.toFixed(2)}</div>
                  </div>

                  <div className="total-block py-5 flex justify-between border-b border-line">
                    <div className="text-title">Discount</div>
                    <div className="text-title">
                      -$<span className="discount">{discount}</span>
                      <span>.00</span>
                    </div>
                  </div>
                  <div className="total-block py-5 flex justify-between border-b border-line">
                    <div className="text-title">Shipping</div>
                    <div className="text-title">
                      -$<span className="discount">{ship}</span>
                      <span>.00</span>
                    </div>
                  </div>
                  <div className="total-block py-5 flex justify-between border-b border-line">
                    <div className="text-title">Subtotal</div>
                    <div className="text-title">${totalPrice.toFixed(2)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
