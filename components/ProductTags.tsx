import Link from "next/link";
import React from "react";
import { FlyOutLinks } from "@/constants";

const ProductTags: React.FC<{ tags: string[] | null }> = ({ tags }) => {
  return (
    <div className="flex gap-2 text-sm">
      {tags?.map((tag) => {
        const link = FlyOutLinks.find((el) => el.tags.includes(tag));
        return (
          <Link
            href={`/${link?.title}/${tag}`}
            className="bg-gray px-2 py-1 rounded-md font-semibold"
            key={tag}
          >
            {tag}
          </Link>
        );
      })}
    </div>
  );
};

export default ProductTags;
