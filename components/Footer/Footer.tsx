import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import * as Icon from "@phosphor-icons/react/dist/ssr";

const Footer = () => {
    return (
      <>
        <div id="footer" className="footer">
          <div className="footer-main bg-black text-white">
            <div className="container">
              <div className="content-footer py-[60px] flex justify-around flex-wrap gap-y-8">
                <div className="company-infor basis-1/4 max-lg:basis-full pr-7">
                  <Link href={"/"} className="logo">
                    <div className="heading4">Anvogue</div>
                  </Link>
                </div>
                <div className="right-content flex flex-wrap justify-center gap-y-8 basis-3/4 max-lg:basis-full">
                  <div className="list-nav flex justify-between basis-2/3 max-md:basis-full gap-4">
                    <div className="item flex flex-col basis-1/2 ">
                      <div className="text-button-uppercase pb-3">
                        Quick Shop
                      </div>
                      <Link
                        className="caption1 has-line-before duration-300 w-fit"
                        href={"/shop/breadcrumb1"}
                      >
                        Women
                      </Link>
                      <Link
                        className="caption1 has-line-before duration-300 w-fit pt-2"
                        href={"/shop/breadcrumb1"}
                      >
                        Men
                      </Link>
                      <Link
                        className="caption1 has-line-before duration-300 w-fit pt-2"
                        href={"/shop/breadcrumb1"}
                      >
                        Clothes
                      </Link>
                      <Link
                        className="caption1 has-line-before duration-300 w-fit pt-2"
                        href={"/shop/breadcrumb1"}
                      >
                        Accessories
                      </Link>
                      <Link
                        className="caption1 has-line-before duration-300 w-fit pt-2"
                        href={"/blog"}
                      >
                        Blog
                      </Link>
                    </div>
                    <div className="item flex flex-col basis-1/2 ">
                      <div className="text-button-uppercase pb-3">
                        Customer Services
                      </div>
                      <Link
                        className="caption1 has-line-before duration-300 w-fit"
                        href={"/pages/faqs"}
                      >
                        Orders FAQs
                      </Link>
                      <Link
                        className="caption1 has-line-before duration-300 w-fit pt-2"
                        href={"/pages/faqs"}
                      >
                        Shipping
                      </Link>
                      <Link
                        className="caption1 has-line-before duration-300 w-fit pt-2"
                        href={"/pages/faqs"}
                      >
                        Privacy Policy
                      </Link>
                      <Link
                        className="caption1 has-line-before duration-300 w-fit pt-2"
                        href={"/order-tracking"}
                      >
                        Return & Refund
                      </Link>
                    </div>
                    <div className="item flex flex-col basis-1/2 ">
                      <div className="text-button-uppercase pb-3">
                        Customer Services
                      </div>
                      <Link
                        className="caption1 has-line-before duration-300 w-fit"
                        href={"/pages/faqs"}
                      >
                        Orders FAQs
                      </Link>
                      <Link
                        className="caption1 has-line-before duration-300 w-fit pt-2"
                        href={"/pages/faqs"}
                      >
                        Shipping
                      </Link>
                      <Link
                        className="caption1 has-line-before duration-300 w-fit pt-2"
                        href={"/pages/faqs"}
                      >
                        Privacy Policy
                      </Link>
                      <Link
                        className="caption1 has-line-before duration-300 w-fit pt-2"
                        href={"/order-tracking"}
                      >
                        Return & Refund
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="footer-bottom py-3 flex items-center justify-between gap-5 max-lg:justify-center max-lg:flex-col border-t border-line">
                <div className="left flex items-center gap-8">
                  <div className="copyright caption1 text-secondary">
                    ©2023 Anvogue. All Rights Reserved.
                  </div>
                
                </div>
                <div className="right flex items-center gap-2">
                  <div className="caption1 text-secondary">Payment:</div>
                  <div className="payment-img">
                    <Image
                      src={"/images/payment/Frame-0.png"}
                      width={500}
                      height={500}
                      alt={"payment"}
                      className="w-9"
                    />
                  </div>
                  <div className="payment-img">
                    <Image
                      src={"/images/payment/Frame-1.png"}
                      width={500}
                      height={500}
                      alt={"payment"}
                      className="w-9"
                    />
                  </div>
                  <div className="payment-img">
                    <Image
                      src={"/images/payment/Frame-2.png"}
                      width={500}
                      height={500}
                      alt={"payment"}
                      className="w-9"
                    />
                  </div>
                  <div className="payment-img">
                    <Image
                      src={"/images/payment/Frame-3.png"}
                      width={500}
                      height={500}
                      alt={"payment"}
                      className="w-9"
                    />
                  </div>
                  <div className="payment-img">
                    <Image
                      src={"/images/payment/Frame-4.png"}
                      width={500}
                      height={500}
                      alt={"payment"}
                      className="w-9"
                    />
                  </div>
                  <div className="payment-img">
                    <Image
                      src={"/images/payment/Frame-5.png"}
                      width={500}
                      height={500}
                      alt={"payment"}
                      className="w-9"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default Footer