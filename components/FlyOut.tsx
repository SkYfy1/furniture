"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useState } from "react";

interface FlyOut {
  title: string;
  links: string[];
}

const FlyOut: React.FC<FlyOut> = ({ title, links }) => {
  const [showMore, setShowMore] = useState(false);

  const handleChangeView = () => {
    setShowMore((prev) => !prev);
  };

  return (
    <li
      onMouseEnter={handleChangeView}
      onMouseLeave={handleChangeView}
      className="relative py-1"
    >
      <span className="flex gap-3 items-center group hover:underline capitalize cursor-pointer">
        {title}
        <span
          className={cn(
            "group-hover:rotate-180 duration-150 border-t-8 border-x-5 border-x-transparent",
            showMore && "rotate-180"
          )}
        ></span>
      </span>
      {showMore && (
        <div className="absolute group top-7 left-0 flex flex-col space-y-3 py-6 w-[200px] bg-white border border-gray-200 rounded-md text-sm">
          {links.map((link) => (
            <Link
              key={link}
              href={`/${title}/${link}`}
              className="w-full hover:bg-gray-200 pl-6 py-2 capitalize"
            >
              {link.split("-").join(" ")}
            </Link>
          ))}
        </div>
      )}
    </li>
  );
};

export default FlyOut;
