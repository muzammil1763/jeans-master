"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { selectCartQuantity } from "@/utils/cartSlice"; 


import useMenuMobile from "./useMenuMobile";


import { useRouter } from "next/navigation";

interface Props {
  props: string;
}

const MenuOne: React.FC<Props> = ({ props }) => {
  const router = useRouter();
  const pathname = usePathname();
  
 const quantity = useSelector(selectCartQuantity);
  const { openMenuMobile, handleMenuMobile } = useMenuMobile();
  const [openSubNavMobile, setOpenSubNavMobile] = useState<number | null>(null);



  const handleOpenSubNavMobile = (index: number) => {
    setOpenSubNavMobile(openSubNavMobile === index ? null : index);
  };

  const [fixedHeader, setFixedHeader] = useState(false);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setFixedHeader(scrollPosition > 0 && scrollPosition < lastScrollPosition);
      setLastScrollPosition(scrollPosition);
    };

    // Gắn sự kiện cuộn khi component được mount
    window.addEventListener("scroll", handleScroll);

    // Hủy sự kiện khi component bị unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollPosition]);


 

  return (
    <>
      <div
        className={`header-menu style-one ${
          fixedHeader ? "fixed" : "absolute"
        } top-0 left-0 right-0 w-full md:h-[74px] h-[56px] ${props}`}
      >
        <div className="container mx-auto h-full">
          <div className="header-main flex justify-between h-full">
            <div
              className="menu-mobile-icon lg:hidden flex items-center"
              onClick={handleMenuMobile}
            >
              <i className="icon-category text-2xl"></i>
            </div>
            <div className="left flex items-center gap-16">
              <Link
                href={"/"}
                className="flex items-center max-lg:absolute max-lg:left-1/2 max-lg:-translate-x-1/2"
              >
                <div className="heading4">Anvogue</div>
              </Link>
              <div className="menu-main h-full max-lg:hidden">
                <ul className="flex items-center gap-8 h-full">
                  <li className="h-full relative">
                    <Link
                      href="/"
                      className={`text-button-uppercase duration-300 h-full flex items-center justify-center gap-1 ${
                        pathname === "/" ? "active" : ""
                      }`}
                    >
                      Home
                    </Link>
                  </li>
                  <li className="h-full relative">
                    <Link
                      href="/pages/about"
                      className={`text-button-uppercase duration-300 h-full flex items-center justify-center gap-1 ${
                        pathname === "" ? "active" : ""
                      }`}
                    >
                      About
                    </Link>
                  </li>
                  <li className="h-full relative">
                    <Link
                      href="/shop/default"
                      className={`text-button-uppercase duration-300 h-full flex items-center justify-center gap-1 ${
                        pathname === "" ? "active" : ""
                      }`}
                    >
                      Shop
                    </Link>
                  </li>
                  <li className="h-full relative">
                    <Link
                      href="/pages/contact"
                      className={`text-button-uppercase duration-300 h-full flex items-center justify-center gap-1 ${
                        pathname === "" ? "active" : ""
                      }`}
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="right flex gap-12">
             
              <div className="list-action flex items-center gap-4">
                <div
                  className="cart-icon flex items-center relative cursor-pointer"
                  
                >
                  <Link href={"/cart"}>
                    <Icon.Handbag size={24} color="black" />
                    <span className="quantity cart-quantity absolute -right-1.5 -top-1.5 text-xs text-white bg-black w-4 h-4 flex items-center justify-center rounded-full">{quantity}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="menu-mobile" className={`${openMenuMobile ? "open" : ""}`}>
        <div className="menu-container bg-white h-full">
          <div className="container h-full">
            <div className="menu-main h-full overflow-hidden">
              <div className="heading py-2 relative flex items-center justify-center">
                <div
                  className="close-menu-mobile-btn absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-surface flex items-center justify-center"
                  onClick={handleMenuMobile}
                >
                  <Icon.X size={14} />
                </div>
                <Link
                  href={"/"}
                  className="logo text-3xl font-semibold text-center"
                >
                  Anvogue
                </Link>
              </div>
              <div className="form-search relative mt-2">
                <Icon.MagnifyingGlass
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer"
                />
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  className=" h-12 rounded-lg border border-line text-sm w-full pl-10 pr-4"
                />
              </div>
              <div className="list-nav mt-6">
                <ul>
                  <li
                    className={`${openSubNavMobile === 1 ? "open" : ""}`}
                    onClick={() => handleOpenSubNavMobile(1)}
                  >
                    <a
                      href={"/"}
                      className={`text-xl font-semibold flex items-center justify-between`}
                    >
                      Home
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuOne;
