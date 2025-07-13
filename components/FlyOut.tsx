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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleChangeView();
    }
    if (e.key === "Escape") setShowMore(false);
  };

  return (
    <li
      onMouseEnter={handleChangeView}
      onMouseLeave={handleChangeView}
      className="relative py-1"
    >
      <button
        className="flex gap-3 items-center group hover:underline capitalize cursor-pointer"
        onKeyDown={handleKeyDown}
        aria-expanded={showMore}
        aria-controls={`${title}-link menu`}
        aria-haspopup="true"
      >
        {t(`${title.toLowerCase()}.title` as "rooms.title")}
        <span
          className={cn(
            "group-hover:rotate-180 duration-150 border-t-8 border-x-5 border-x-transparent",
            showMore && "rotate-180"
          )}
          aria-hidden="true"
        ></span>
      </button>
      {showMore && (
        <ul
          id={`${title}-link menu`}
          className="flex flex-col absolute group w-[200px] top-7 left-0 space-y-3 py-6 bg-white border border-gray-200 rounded-md text-sm"
        >
          {links.map((link, index) => {
            return (
              <li key={link}>
                <Link
                  href={`/${title}/${link}`}
                  className="block pl-6 py-2 capitalize hover:bg-gray-200"
                >
                  {t(`${title}.tag${index + 1}` as `promotions.tag1`)}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
};

export default FlyOut;
