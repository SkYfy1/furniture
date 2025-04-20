"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";

import React, { useEffect, useRef, useState } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const MotionList: React.FC<Props> = ({ children, className }) => {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current != null) {
      setWidth(ref.current.scrollWidth - ref.current.offsetWidth);
    }
  }, []);

  return (
    <div ref={ref} className="w-full overflow-hidden">
      <motion.div
        initial={false}
        drag="x"
        dragConstraints={{
          left: -width,
          right: 0,
        }}
        className={cn("flex gap-3 w-full justify-between", className)}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default MotionList;

{
  /* <button
        className="absolute right-0 top-1/2 z-20 -translate-y-full bg-white rounded-full p-3 border-gray-500"
        onClick={() =>
          ref.current?.scrollTo(
            ref.current.scrollLeft + ref.current.offsetWidth,
            0
          )
        }
      >
        <Image
          src="/svg/b9f50123-f337-49a6-b90e-bb3fdf52bbab.svg"
          height={20}
          width={20}
          alt="arrow"
        />
      </button> */
}
