import Image from "next/image";

import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full col-span-5 px-6 pt-36 pb-5 flex flex-col gap-4">
      <Image src="/svg/lofofrntr.svg" width={180} height={60} alt="logo" />
      <div className="text-lg">
        <p>hello@frntr.com</p>
        <p>+381642247467</p>
        <p>Main St. 10, EAC2CQ, London</p>
      </div>
      <a href="https://www.twitter.com/CrystallizeAPI">
        <Image src="/svg/twitter.svg" width={25} height={25} alt="twitter" />
      </a>
      <div className="flex gap-2 items-center mt-20 pt-2 border-t border-gray-200">
        <div className="flex justify-between w-full">
          <p>
            Only for <span className="underline lg:text-lg">Education</span>
          </p>
          <p>
            UX/UI by <span className="lg:text-lg">FRNTR</span>@ 2023
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
