"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

interface Props {
  image: string;
  name: string;
}

const ImageInspect: React.FC<Props> = ({ image, name }) => {
  const [crop, setCrop] = useState(false);
  const [directions, setDirections] = useState({
    x: 300,
    y: 300,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ref = containerRef.current;
    const handleChange = () => setCrop((prev) => !prev);

    console.log(window.innerWidth, screen.width);

    const handleMove = (e: MouseEvent) => {
      const rect = containerRef?.current?.getBoundingClientRect();
      if (!rect) return;

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const containerWidth = rect.width;
      const containerHeight = rect.height;
      const magnifierSize = 300;
      const magnifierHalfSize = magnifierSize / 2;

      let finalX = x;
      let finalY = y;

      // const clampedX = Math.max(
      //   magnifierHalfSize,
      //   Math.min(x, containerWidth - magnifierHalfSize)
      // );

      // const clampedY = Math.max(
      //   magnifierHalfSize,
      //   Math.min(y, containerHeight - magnifierHalfSize)
      // );

      if (x < magnifierHalfSize) {
        finalX = magnifierHalfSize;
      } else if (x > containerWidth - magnifierHalfSize) {
        finalX = containerWidth - magnifierHalfSize;
      }

      if (y < magnifierHalfSize) {
        finalY = magnifierHalfSize;
      } else if (y > containerHeight - magnifierHalfSize) {
        finalY = containerHeight - magnifierHalfSize;
      }

      setDirections({
        x: finalX,
        y: finalY,
      });
    };

    if (screen.width > 1024) {
      ref?.addEventListener("mouseover", handleChange);
      ref?.addEventListener("mouseout", handleChange);

      ref?.addEventListener("mousemove", handleMove);
    }

    return () => {
      ref?.removeEventListener("mouseover", handleChange);
      ref?.addEventListener("mouseout", handleChange);
      ref?.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return (
    <>
      <div className="flex justify-center">
        <div
          className="w-[600] h-[600] max-h-[1400] relative z-0"
          ref={containerRef}
        >
          <Image src={image} fill className="object-contain" alt={name} />
          {crop && (
            <div
              className={"bg-gray-200 opacity-50 rounded-2xl size-75 absolute"}
              style={{
                transform: `translate(${directions.x - 150}px, ${
                  directions.y - 150
                }px)`,
              }}
            ></div>
          )}
        </div>
      </div>
      {crop && (
        <div className="absolute top-21 right-5 2xl:right-1/8 3xl:right-1/5 translate-x-4 3xl:-translate-x-1 h-[600] w-[600] z-10 overflow-hidden rounded-lg">
          <Image
            src={image}
            fill
            className="object-contain"
            alt={name}
            style={{
              transform: `translate(${300 - directions.x * 3}px, ${
                300 - directions.y * 3
              }px) scale(3)`,
              transformOrigin: "0 0",
            }}
          />
        </div>
      )}
    </>
  );
};

export default ImageInspect;
