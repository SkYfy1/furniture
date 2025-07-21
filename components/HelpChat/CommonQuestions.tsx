import React from "react";
import { questionsData } from "@/constants";

interface Props {
  suggestions: string;
  selectQuestion: (question: string, answer: string) => void;
}

const CommonQuestions: React.FC<Props> = ({ suggestions, selectQuestion }) => {
  const suggestion = questionsData.filter(
    (el) =>
      suggestions.trim() !== "" &&
      el.question.toLowerCase().includes(suggestions.toLowerCase())
  );

  if (!suggestion.length) return null;

  return (
    <div
      className="flex flex-col gap-1 absolute bottom-13 left-0 w-full px-4 bg-white/10 backdrop-blur-xs h-full justify-end"
      data-id="chat-questions"
    >
      {suggestion.map((question) => (
        <div
          key={`question-${question.id}`}
          className="p-2 border border-black/20 bg-white/60 transition-colors rounded-md text-sm cursor-pointer hover:bg-gray/80 shadow-md"
          onClick={() => selectQuestion(question.question, question.answer)}
        >
          {question.question}
        </div>
      ))}
    </div>
  );
};

export default CommonQuestions;
