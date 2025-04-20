import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface Props {
  title: string;
  link: string;
  className?: string;
}

const CustomLink: React.FC<Props> = ({ title, link, className }) => {
  return (
    <Link
      href={link}
      className={cn(
        "lg:text-lg font-semibold bg-gray-100 px-5 py-2 rounded-md hover:bg-black hover:text-white duration-150",
        className
      )}
    >
      {title}
    </Link>
  );
};

export default CustomLink;
