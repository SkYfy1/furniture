import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <header className="flex justify-between items-center lg:pt-2 lg:pb-5 container">
      <div className="flex gap-12 items-center">
        <Image src="/svg/lofofrntr.svg" width={170} height={60} alt="logo" />
        <div className="flex justify-between items-center gap-12">
          <input
            type="text"
            placeholder="Names, categories..."
            className="bg-gray-200 rounded-full px-6 py-2"
          />
          <ul className="flex gap-12 items-center">
            <li>Shop</li>
            <li>Stories</li>
            <li>Promotions</li>
            <li>Room</li>
            <li>Specials</li>
          </ul>
        </div>
      </div>
      <div className="flex gap-3 items-center">
        <Image src="/svg/userIcon.svg" width={30} height={30} alt="user icon" />
        <Image src="/svg/basketIcon.svg" width={30} height={30} alt="basket" />
        <select name="En" id="En">
          <option value="En">En</option>
          <option value="Fr">En</option>
        </select>
      </div>
    </header>
  );
};

export default Header;
