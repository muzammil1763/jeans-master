// /components/ProductList.tsx

"use client";

import React from "react";
import Link from "next/link";import { motion } from "framer-motion";

export default function ProductList({ products }: { products: any[] }) {
  const [activeTab, setActiveTab] = React.useState<string>("");

  const handleTabClick = (type: string) => {
    setActiveTab(type);
  };

  return (
    <>
      <div className="heading flex flex-col items-center text-center">
        <div className="menu-tab flex items-center gap-2 p-1 bg-surface rounded-2xl mt-6">
          {["Men", "Women"].map((type) => (
            <div
              key={type}
              className={`tab-item relative text-button-uppercase py-2 px-5 cursor-pointer duration-500 ${
                activeTab === type ? "bg-black text-white" : "text-black"
              }`}
              onClick={() => handleTabClick(type)}
            >
              {activeTab === type && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 rounded-2xl bg-black"
                ></motion.div>
              )}
              <span className="relative z-[1]">{type}</span>
            </div>
          ))}
        </div>
      </div>

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {products.map((product: any) => (
              <div key={product._id} className="lg:w-1/4 md:w-1/2 p-4 w-full">
                <div className="block relative h-48 rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    className="object-cover object-center w-full h-full block"
                    src={product.colorImage} // Replace with your product image source
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                    {product.colorName}{" "}
                    {/* Assuming 'colorName' is a property */}
                  </h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    {product.colorName}{" "}
                    {/* Assuming 'colorName' is a property */}
                  </h2>
                  <p className="mt-1">${product.price}</p>{" "}
                  {/* Assuming 'price' is a property */}
                  <Link href={`/product/${product._id}`}>
                    <button className="tw-py-1 tw-px-4 tw-bg-white tw-text-black">
                      Select
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
