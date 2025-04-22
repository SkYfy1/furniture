import React from "react";

interface Props {
  title: string;
  paragraph: string;
  className?: string;
}

const TipSection: React.FC<Props> = ({ title, paragraph, className }) => {
  return (
    <section className={className}>
      <h2 className="text-3xl font-bold pt-10 mt-8">{title}</h2>
      <p className="pt-4">{paragraph}</p>
    </section>
  );
};

export default TipSection;
