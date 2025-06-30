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
    <motion.div ref={ref} className="w-full overflow-hidden">
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
    </motion.div>
  );
};

export default MotionList;
