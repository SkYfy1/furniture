"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import FlyOut from "./FlyOut";
import { FlyOutLinks } from "@/constants";
import { useAppSelector } from "@/lib/hooks";
import SearchProducts from "./SearchProducts";
import { useTranslations } from "next-intl";
import LocaleSelect from "./LocaleSelect";
import MobileNav from "./MobileNav";

const Header: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const cartSize = useAppSelector((state) => state.cart.items.length);
  const t = useTranslations("Header");

  const placeholder = t("Search");

  const handleClose = (e: React.MouseEvent<HTMLElement>) => {
    if ((e.target as HTMLElement).tagName === "A") {
      setShowMenu(false);
    }
  };

  return (
    <header className="lg:pt-4 lg:pb-5 py-4 px-5 xl:px-0 fixed top-0 left-0 w-full bg-white z-50">
      <div className="container flex gap-5 md:gap-0 justify-between items-center">
        <div className="flex gap-12 items-center">
          <Link href="/">
            <Image
              src="/svg/lofofrntr.svg"
              width={170}
              height={20}
              alt="logo"
            />
          </Link>
          <div className="justify-between items-center gap-12 hidden lg:flex">
            <SearchProducts placeholder={placeholder} />
            <nav aria-label="Desktop navigation">
              <ul className="flex xl:gap-12 gap-4 items-center">
                <li className="cursor-pointer hover:underline">
                  <Link data-id="desktop-shop-link" href="/shop">
                    {t("Nav.shop")}
                  </Link>
                </li>
                <li className="cursor-pointer hover:underline">
                  <Link href="/stories">{t("Nav.stories")}</Link>
                </li>
                {FlyOutLinks.map((link) => (
                  <FlyOut
                    key={link.title}
                    title={link.title}
                    links={link.tags}
                  />
                ))}
              </ul>
            </nav>
          </div>
        </div>
        <div className="flex gap-1 lg:gap-3 items-center">
          <Link
            href="/orders"
            className="hover:bg-gray p-1 md:p-2"
            aria-label="Go to user page"
          >
            <Image
              src="/svg/userIcon.svg"
              width={32}
              height={32}
              alt=""
              role="presentation"
            />
          </Link>
          <Link
            href="/cart"
            className="hover:bg-gray p-1 md:p-2 relative"
            data-id="cart-link"
            aria-label="Go to shopping cart"
          >
            <Image
              src="/svg/basketIcon.svg"
              width={32}
              height={32}
              alt=""
              role="presentation"
            />
            {cartSize > 0 && (
              <span
                className="absolute top-1 right-0.5 md:top-1.5 md:right-1 text-[0.6rem] md:text-xs size-3 md:size-4 text-center text-white bg-red-600 rounded-full"
                data-id="cart-size"
              >
                {cartSize}
              </span>
            )}
          </Link>
          <LocaleSelect />
          <button
            aria-expanded={showMenu}
            aria-controls="menu-mobile"
            aria-label={showMenu ? "Close navigation" : "Open navigation"}
            className="lg:hidden"
            onClick={() => setShowMenu((prev) => !prev)}
            data-id="menu-toggle-btn"
          >
            {!showMenu ? (
              <Image
                width={28}
                height={28}
                src="/svg/d788420a-4e6e-42cc-be4a-d276659a9021.svg"
                alt=""
                aria-hidden="true"
                role="presentation"
              />
            ) : (
              <Image
                width={28}
                height={28}
                src="/svg/delete.svg"
                alt=""
                aria-hidden="true"
                role="presentation"
              />
            )}
          </button>
        </div>
      </div>
      {showMenu && <MobileNav closeMenu={handleClose} />}
    </header>
  );
};

export default Header;
