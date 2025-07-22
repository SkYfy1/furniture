import React from "react";

interface Suggestion {
  id: number;
  question: string;
  answer: string;
}

interface Props {
  suggestions: Suggestion[];
  selectQuestion: (question: string, answer: string) => void;
  selected: number | null;
  ref: React.RefObject<HTMLButtonElement | null>;
}

const CommonQuestions: React.FC<Props> = ({
  suggestions,
  selectQuestion,
  ref,
  selected,
}) => {
  if (!suggestions.length) return null;

  return (
    <div
      className="flex flex-col gap-1 absolute bottom-18 left-0 w-full px-4 bg-white/10 backdrop-blur-xs h-[80%] justify-end"
      data-id="chat-questions"
      id="suggestions-list"
    >
      {suggestions.map((question, index) => (
        <button
          tabIndex={1}
          role="option"
          aria-selected={index === selected}
          ref={index === selected ? ref : null}
          key={`question-${question.id}`}
          className="p-2 border border-black/20 bg-white/60 transition-colors rounded-md text-sm cursor-pointer hover:bg-gray/80 shadow-md"
          onClick={() => selectQuestion(question.question, question.answer)}
        >
          {question.question}
        </button>
      ))}
    </div>
  );
};

export default CommonQuestions;
