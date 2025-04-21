"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import FlyOut from "./FlyOut";

const Header: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleClose = (e: React.MouseEvent<HTMLElement>) => {
    if ((e.target as HTMLElement).tagName === "A") {
      setShowMenu(false);
    }
  };

  return (
    <header className="lg:pt-4 lg:pb-5 py-4 px-5 lg:px-0 fixed top-0 left-0 w-full bg-white z-50">
      <div className="container flex justify-between items-center">
        <div className="flex gap-12 items-center">
          <Image src="/svg/lofofrntr.svg" width={180} height={60} alt="logo" />
          <div className="justify-between items-center gap-12 hidden md:flex">
            <div className="relative">
              <input
                type="text"
                placeholder="Names, categories..."
                className="bg-gray-50 rounded-full pl-6 pr-22 py-2 focus:outline-1"
              />
              <Image
                className="absolute top-1/2 right-3 -translate-y-1/2"
                src="/svg/searchIcon-6EQLXFJK.svg"
                height={18}
                width={18}
                alt="search-icon"
              />
            </div>
            <ul className="flex gap-12 items-center">
              <li>
                <Link href="/shop">Shop</Link>
              </li>
              <li>
                <Link href="/stories">Stories</Link>
              </li>
              <FlyOut title="promotions" links={["3-for-2", "4-for-3"]} />
              <FlyOut
                title="rooms"
                links={["kitchen", "living-room", "outdoors", "furniture"]}
              />
              <FlyOut
                title="specials"
                links={["eco-friendly", "vegan", "new-arrival"]}
              />
            </ul>
          </div>
        </div>
        <div className="flex gap-2 lg:gap-3 items-center">
          <Image
            src="/svg/userIcon.svg"
            width={32}
            height={32}
            alt="user icon"
          />
          <Image
            src="/svg/basketIcon.svg"
            width={32}
            height={32}
            alt="basket"
          />
          <select name="En" id="En" className="p-0.5 pr-2 border-2 rounded-sm">
            <option value="En">En</option>
            <option value="Fr">Fr</option>
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
            <div className="relative">
              <input
                type="text"
                placeholder="Names, categories..."
                className="bg-gray-50 rounded-full pl-6 pr-22 py-2 focus:outline-1"
              />
              <Image
                className="absolute top-1/2 right-3 -translate-y-1/2"
                src="/svg/searchIcon-6EQLXFJK.svg"
                height={18}
                width={18}
                alt="search-icon"
              />
            </div>
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
