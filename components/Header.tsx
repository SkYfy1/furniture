"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import FlyOut from "./FlyOut";
import { FlyOutLinks } from "@/constants";
import { useAppSelector } from "@/lib/hooks";
import SearchProducts from "./SearchProducts";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const Header: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const cartSize = useAppSelector((state) => state.cart.items.length);
  const [locale, setLocale] = useState<string>("");
  const router = useRouter();
  const t = useTranslations("Header");

  const placeholder = t("Search");

  useEffect(() => {
    const cookieLocale = document.cookie
      .split("; ")
      .find((row) => row.startsWith("FRNTR_LOCALE="))
      ?.split("=")[1];

    if (cookieLocale) {
      setLocale(cookieLocale);
    } else {
      // Get browser locale (not using bc my locale UA(Not implemented locale))
      // const browseLocale = navigator.language.slice(0, 2);

      setLocale("en");
      document.cookie = `FRNTR_LOCALE=en;`;
      router.refresh();
    }
  }, [router]);

  const handleClose = (e: React.MouseEvent<HTMLElement>) => {
    if ((e.target as HTMLElement).tagName === "A") {
      setShowMenu(false);
    }
  };

  const handleChangeLocale = (value: string) => {
    setLocale(value);
    document.cookie = `FRNTR_LOCALE=${value};`;
    router.refresh();
  };

  return (
    <header className="lg:pt-4 lg:pb-5 py-4 px-5 xl:px-0 fixed top-0 left-0 w-full bg-white z-50">
      <div className="container flex justify-between items-center">
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
                <Link href="/shop">{t("Nav.shop")}</Link>
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
        <div className="flex gap-2 lg:gap-3 items-center">
          <Link href="/orders" className="hover:bg-gray p-2">
            <Image
              src="/svg/userIcon.svg"
              width={32}
              height={32}
              alt="user icon"
            />
          </Link>
          <Link href="/cart" className="hover:bg-gray p-2 relative">
            <Image
              src="/svg/basketIcon.svg"
              width={32}
              height={32}
              alt="basket"
            />
            {cartSize > 0 && (
              <span className="absolute top-1.5 right-1 text-xs size-4 text-center text-white bg-red-600 rounded-full">
                {cartSize}
              </span>
            )}
          </Link>
          <select
            name="lang"
            id="lang"
            value={locale}
            onChange={(e) => handleChangeLocale(e.target.value)}
            className="p-0.5 pr-2 border-2 rounded-sm"
          >
            <option value="en">En</option>
            <option value="fr">Fr</option>
          </select>
          <button
            className="lg:hidden"
            onClick={() => setShowMenu((prev) => !prev)}
          >
            {!showMenu ? (
              <Image
                width={25}
                height={25}
                src="/svg/d788420a-4e6e-42cc-be4a-d276659a9021.svg"
                alt="basket"
              />
            ) : (
              <Image
                width={25}
                height={25}
                src="/svg/delete.svg"
                alt="basket"
              />
            )}
          </button>
        </div>
      </div>
      {showMenu && (
        <div className="absolute top-0 left-0 mt-15 h-screen w-full bg-white">
          <div className="justify-between items-start pl-10 gap-12 flex flex-col pt-12">
            <SearchProducts placeholder={placeholder} />
            <ul
              className="flex flex-col gap-12 items-start"
              onClick={handleClose}
            >
              <li>
                <Link href="/shop">Shop</Link>
              </li>
              <li>
                <Link href="/stories">Stories</Link>
              </li>
              <li className="flex flex-col gap-2">
                <span>Promotions</span>
                <ul className="flex flex-col gap-3 text-xs">
                  <Link href="/promotions/3-for-2">3 for 2</Link>
                  <Link href="/promotions/stories">4 for 3</Link>
                </ul>
              </li>
              <li className="flex flex-col gap-2">
                <span>Rooms</span>
                <ul className="flex flex-col gap-3 capitalize text-xs">
                  <Link href="/rooms/kitchen">kitchen</Link>
                  <Link href="/rooms/living-room">living room</Link>
                  <Link href="/rooms/outdoors">outdoors</Link>
                  <Link href="/rooms/furniture">furniture</Link>
                </ul>
              </li>
              <li className="flex flex-col gap-2">
                <span>Specials</span>
                <ul className="flex flex-col gap-3 capitalize text-xs">
                  <Link href="/specials/eco-friendly">eco friendly</Link>
                  <Link href="/specials/vegan">vegan</Link>
                  <Link href="/specials/new-arrival">newarrival</Link>
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
