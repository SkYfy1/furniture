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
                <FlyOut key={link.title} title={link.title} links={link.tags} />
              ))}
            </ul>
          </div>
        </div>
        <div className="flex gap-1 lg:gap-3 items-center">
          <Link href="/orders" className="hover:bg-gray p-1 md:p-2">
            <Image
              src="/svg/userIcon.svg"
              width={32}
              height={32}
              alt="user icon"
            />
          </Link>
          <Link
            href="/cart"
            className="hover:bg-gray p-1 md:p-2 relative"
            data-id="cart-link"
          >
            <Image
              src="/svg/basketIcon.svg"
              width={32}
              height={32}
              alt="basket"
            />
            {cartSize > 0 && (
              <span
                className="absolute top-1 right-0.5 md:top-1.5 md:right-1 text-[0.6rem] md:text-xs size-3 text-center text-white bg-red-600 rounded-full"
                data-id="cart-size"
              >
                {cartSize}
              </span>
            )}
          </Link>
          <LocaleSelect />
          <button
            className="lg:hidden"
            onClick={() => setShowMenu((prev) => !prev)}
            data-id="menu-toggle-btn"
          >
            {!showMenu ? (
              <Image
                width={28}
                height={28}
                src="/svg/d788420a-4e6e-42cc-be4a-d276659a9021.svg"
                alt="basket"
              />
            ) : (
              <Image
                width={28}
                height={28}
                src="/svg/delete.svg"
                alt="basket"
              />
            )}
          </button>
        </div>
      </div>
      {showMenu && (
        <div
          className="absolute top-0 left-0 mt-15 h-screen w-full bg-white"
          data-id="open-menu"
        >
          <div className="justify-between items-start pl-10 gap-12 flex flex-col pt-12">
            <SearchProducts placeholder={placeholder} />
            <ul
              className="flex flex-col gap-12 items-start"
              onClick={handleClose}
            >
              <li>
                <Link data-id="mobile-shop-link" href="/shop">
                  {t("Nav.shop")}
                </Link>
              </li>
              <li>
                <Link href="/stories">{t("Nav.stories")}</Link>
              </li>
              <li className="flex flex-col gap-2">
                <span>{t("Nav.promotions.title")}</span>
                <ul className="flex flex-col gap-3 capitalize text-xs">
                  <Link href="/promotions/eco-friendly">
                    {t("Nav.promotions.tag1")}
                  </Link>
                  <Link href="/promotions/vegan">
                    {t("Nav.promotions.tag2")}
                  </Link>
                  <Link href="/promotions/new-arrival">
                    {t("Nav.promotions.tag3")}
                  </Link>
                </ul>
              </li>
              <li className="flex flex-col gap-2">
                <span>{t("Nav.rooms.title")}</span>
                <ul className="flex flex-col gap-3 capitalize text-xs">
                  <Link href="/rooms/kitchen">{t("Nav.rooms.tag1")}</Link>
                  <Link href="/rooms/living-room">{t("Nav.rooms.tag2")}</Link>
                  <Link href="/rooms/outdoors">{t("Nav.rooms.tag3")}</Link>
                  <Link href="/rooms/furniture">{t("Nav.rooms.tag4")}</Link>
                </ul>
              </li>
              <li className="flex flex-col gap-2">
                <span>{t("Nav.specials.title")}</span>
                <ul className="flex flex-col gap-3 text-xs">
                  <Link href="/specials/3-for-2">{t("Nav.specials.tag1")}</Link>
                  <Link href="/specials/4-for-3">{t("Nav.specials.tag2")}</Link>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
