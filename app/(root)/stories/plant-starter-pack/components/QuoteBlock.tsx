import React from "react";

const QuoteBlock: React.FC = () => {
  return (
    <blockquote
      className="my-12 italic font-medium before:content-[open-quote] before:text-6xl flex gap-4"
      cite="https://furniture.superfast.store/en/stories/plant-starter-pack"
    >
      <p>
        “Plants are more courageous than almost all human beings: an orange tree
        would rather die than produce lemons, whereas instead of dying the
        average person would rather be someone they are not.” - Mokokoma
        Mokhonoana
      </p>
    </blockquote>
  );
};

export default QuoteBlock;
