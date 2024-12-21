"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/utils/cartSlice";
import { CartItem } from "@/utils/interface";
import Link from "next/link";

interface ImageOption {
  url: string;
  name: string;
}

interface Product {
  _id: string;
  disc: string;
  price: number;
  colorName: string;
  colorImage: string;
  colorImageName:string;
  fabrics: ImageOption[];
  frontPockets: ImageOption[];
  backPockets: ImageOption[];
}

const ProductDefault: React.FC<{ product: Product }> = ({ product }) => {
  const [selectedFabric, setSelectedFabric] = useState<ImageOption | null>(
    product.fabrics[0] || null
  );
  const [selectedOptions, setSelectedOptions] = useState<{
    frontPocket: ImageOption | null;
    backPocket: ImageOption | null;
  }>({
    frontPocket: product.frontPockets[0] || null,
    backPocket: product.backPockets[0] || null,
  });
  const [measurements, setMeasurements] = useState({ waist: "", length: "" });
  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMeasurements({
      ...measurements,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddToCart = () => {
 

    if (product) {
      const cartItem: CartItem = {
        _id: product._id,
        price: product.price,
        quantity: 1,
        colorName: product.colorName,
        colorImage: product.colorImage,
        fabricName: selectedFabric?.name || "",
        frontPocketName: selectedOptions.frontPocket?.name || "",
        backPocketName: selectedOptions.backPocket?.name || "",
        waist: Number(measurements.waist),
        length: Number(measurements.length),
      };
      dispatch(addToCart(cartItem));
     

      // Redirect to the cart page or show a success message
    }
  };

  return (
    <>
      <section className="text-black body-font overflow-hidden bg-white">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src={product.colorImage || "/path/to/placeholder.jpg"}
              onError={(e) =>
                (e.currentTarget.src = "/path/to/placeholder.jpg")
              }
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
              {product.colorImageName}
              </h2>
              <h1 className="text-black text-3xl title-font font-medium mb-1">
                {product.colorName}
              </h1>
              <p className="leading-relaxed text-gray-700">{product.disc}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                <div className="flex ml-6 items-center">
                  <span className="mr-3 text-gray-700">Price</span>
                  <span className="title-font font-medium text-2xl text-black">
                    ${product.price}
                  </span>
                </div>
              </div>
              <div className="flex">
                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-600 ml-4">
                  ♥
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Step 1: Fabric Selection */}
        <div className="container mx-auto py-8">
          <h2 className="text-2xl font-bold mb-4">Select Fabric</h2>
          <div className="grid grid-cols-4 gap-4">
            {product.fabrics.map((fabric, index) => (
              <div
                key={index}
                className={`p-2 border-2 rounded ${
                  selectedFabric?.url === fabric.url
                    ? "border-black"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedFabric(fabric)}
              >
                <img
                  src={fabric.url}
                  alt={`Fabric ${index + 1}`}
                  className="w-full h-64 object-cover rounded"
                  onError={(e) =>
                    (e.currentTarget.src = "/path/to/placeholder.jpg")
                  }
                />
                <p className="text-center mt-2">{fabric.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Step 2: Options Selection */}
        <div className="container mx-auto py-8">
          <h2 className="text-2xl font-bold mb-4">Select Options</h2>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-2">Front Pocket</h3>
            <div className="grid grid-cols-4 gap-4">
              {product.frontPockets.map((option, index) => (
                <div
                  key={index}
                  className={`p-2 border-2 rounded ${
                    selectedOptions.frontPocket?.url === option.url
                      ? "border-black"
                      : "border-gray-300"
                  }`}
                  onClick={() =>
                    setSelectedOptions({
                      ...selectedOptions,
                      frontPocket: option,
                    })
                  }
                >
                  <img
                    src={option.url}
                    alt={`Front Pocket ${index + 1}`}
                    className="w-full h-64 object-cover rounded"
                    onError={(e) =>
                      (e.currentTarget.src = "/path/to/placeholder.jpg")
                    }
                  />
                  <p className="text-center mt-2">{option.name}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-2">Back Pocket</h3>
            <div className="grid grid-cols-4 gap-4">
              {product.backPockets.map((option, index) => (
                <div
                  key={index}
                  className={`p-2 border-2 rounded ${
                    selectedOptions.backPocket?.url === option.url
                      ? "border-black"
                      : "border-gray-300"
                  }`}
                  onClick={() =>
                    setSelectedOptions({
                      ...selectedOptions,
                      backPocket: option,
                    })
                  }
                >
                  <img
                    src={option.url}
                    alt={`Back Pocket ${index + 1}`}
                    className="w-full h-64 object-cover rounded"
                    onError={(e) =>
                      (e.currentTarget.src = "/path/to/placeholder.jpg")
                    }
                  />
                  <p className="text-center mt-2">{option.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Step 3: Measurements Input */}
        <div className="container mx-auto py-8">
          <h2 className="text-2xl font-bold mb-4">Enter Measurements</h2>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2">Waist</label>
            <input
              type="text"
              name="waist"
              value={measurements.waist}
              onChange={handleInputChange}
              className="border rounded py-2 px-3"
              placeholder="Enter waist measurement"
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2">Length</label>
            <input
              type="text"
              name="length"
              value={measurements.length}
              onChange={handleInputChange}
              className="border rounded py-2 px-3"
              placeholder="Enter length measurement"
            />
          </div>
          <div className="flex justify-end">
            <Link href={"/cart"}>
              <button
                onClick={handleAddToCart}
                className={`px-6 py-2 rounded-full bg-black text-white ${
                  measurements.waist.trim() === "" ||
                  measurements.length.trim() === ""
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={
                  measurements.waist.trim() === "" ||
                  measurements.length.trim() === ""
                }
              >
                Add to Cart
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDefault;
