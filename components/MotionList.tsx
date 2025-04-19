"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";

import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const MotionList: React.FC<Props> = ({ children, className }) => {
  return (
    <div className="w-full overflow-hidden">
      <motion.div
        initial={false}
        drag="x"
        dragConstraints={{
          left: 10,
          right: 10,
        }}
        className={cn("flex gap-3 w-full justify-between", className)}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default MotionList;
