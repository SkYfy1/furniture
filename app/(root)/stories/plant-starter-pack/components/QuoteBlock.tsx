import React from "react";

interface Props {
  quote: string;
}

const QuoteBlock: React.FC<Props> = ({ quote }) => {
  return (
    <blockquote
      className="my-12 lg:my-16 italic text-base lg:text-xl font-medium before:content-[open-quote] before:text-6xl flex gap-4"
      cite="https://furniture.superfast.store/en/stories/plant-starter-pack"
    >
      <p>{quote}</p>
    </blockquote>
  );
};

export default QuoteBlock;
