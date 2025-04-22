import Image from "next/image";
import React from "react";

const ImageGallery: React.FC<{ rows?: number }> = ({ rows }) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="w-full h-[238] lg:h-[300] relative col-span-2">
        <Image
          src="/main/alocasia.jpeg"
          fill
          className="object-cover rounded-md"
          alt="category-image"
        />
      </div>
      <div className="w-full h-[238] lg:h-[300] relative">
        <Image
          src="/main/sofa.jpeg"
          fill
          className="object-cover rounded-md"
          alt="category-image"
        />
      </div>
      <div className="w-full h-[238] lg:h-[300] relative">
        <Image
          src="/main/alocasia.jpeg"
          fill
          className="object-cover rounded-md"
          alt="category-image"
        />
      </div>

      {rows === 4 && (
        <div className="w-full h-[400] lg:h-[300] relative col-span-2">
          <Image
            src="/main/alocasia.jpeg"
            fill
            className="object-cover rounded-md"
            alt="category-image"
          />
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
