import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  title: string;
  paragraph: string;
  className?: string;
}

const TipSection: React.FC<Props> = ({ title, paragraph, className }) => {
  return (
    <section className={cn("p-8 leading-7", className)}>
      <h2 className="text-3xl font-bold pt-10 mt-8">{title}</h2>
      <p className="pt-4 ">{paragraph}</p>
    </section>
  );
};

export default TipSection;
