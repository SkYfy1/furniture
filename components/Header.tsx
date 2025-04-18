import Image from "next/image";
import Link from "next/link";
import React from "react";
import FlyOut from "./FlyOut";

const Header = () => {
  return (
    <header className="lg:pt-4 lg:pb-5 fixed top-0 left-0 w-full bg-white">
      <div className="container flex justify-between items-center">
        <div className="flex gap-12 items-center">
          <Image src="/svg/lofofrntr.svg" width={180} height={60} alt="logo" />
          <div className="flex justify-between items-center gap-12">
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
        <div className="flex gap-3 items-center">
          <Image
            src="/svg/userIcon.svg"
            width={35}
            height={35}
            alt="user icon"
          />
          <Image
            src="/svg/basketIcon.svg"
            width={35}
            height={35}
            alt="basket"
          />
          <select name="En" id="En" className="p-0.5 pr-2 border-2 rounded-sm">
            <option value="En">En</option>
            <option value="Fr">Fr</option>
          </select>
        </div>
      </div>
    </header>
  );
};

export default Header;
