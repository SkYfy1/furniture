import Image from "next/image";
import React from "react";

interface Props {
  rows?: number;
  images: string[];
}

const ImageGallery: React.FC<Props> = ({ rows, images }) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="w-full h-[238] lg:h-[600] relative col-span-2">
        <Image
          src={`/main/${images[0]}`}
          fill
          className="object-cover rounded-md"
          alt="category-image"
        />
      </div>
      <div className="w-full h-[238] lg:h-[650] relative">
        <Image
          src={`/main/${images[1]}`}
          fill
          className="object-cover rounded-md"
          alt="category-image"
        />
      </div>
      <div className="w-full h-[238] lg:h-[650] relative">
        <Image
          src={`/main/${images[2]}`}
          fill
          className="object-cover rounded-md"
          alt="category-image"
        />
      </div>

      {rows === 4 && (
        <div className="w-full h-[400] lg:h-[1000] relative col-span-2">
          <Image
            src={`/main/${images[3]}`}
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
