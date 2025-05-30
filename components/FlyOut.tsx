"use client";

import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { useState } from "react";

interface FlyOut {
  title: string;
  links: string[];
}

const FlyOut: React.FC<FlyOut> = ({ title, links }) => {
  const [showMore, setShowMore] = useState(false);
  const t = useTranslations("Header.Nav");

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
        {t(`${title.toLowerCase()}.title` as "rooms.title")}
        <span
          className={cn(
            "group-hover:rotate-180 duration-150 border-t-8 border-x-5 border-x-transparent",
            showMore && "rotate-180"
          )}
        ></span>
      </span>
      {showMore && (
        <div className="absolute group top-7 left-0 flex flex-col space-y-3 py-6 w-[200px] bg-white border border-gray-200 rounded-md text-sm">
          {links.map((link, index) => {
            return (
              <Link
                key={link}
                href={`/${title}/${link}`}
                className="w-full hover:bg-gray-200 pl-6 py-2 capitalize"
              >
                {t(`${title}.tag${index + 1}` as `promotions.tag1`)}
              </Link>
            );
          })}
        </div>
      )}
    </li>
  );
};

export default FlyOut;
