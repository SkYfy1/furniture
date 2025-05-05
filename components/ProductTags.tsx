import Link from "next/link";
import React from "react";

const ProductTags: React.FC<{ tags: string[] | null }> = ({ tags }) => {
  return (
    <div className="flex gap-2 text-sm">
      {tags?.map((tag) => (
        <Link
          href={`/${tag}`}
          className="bg-gray px-2 py-1 rounded-md font-semibold"
          key={tag}
        >
          {tag}
        </Link>
      ))}
    </div>
  );
};

export default ProductTags;
