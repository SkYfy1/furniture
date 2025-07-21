import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Messages from "./Messages";
import CommonQuestions from "./CommonQuestions";
import { questionsData } from "@/constants";

interface Props {
  handleClose: () => void;
}

const Chat: React.FC<Props> = ({ handleClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedItem, setSelectedItem] = useState<null | number>(null);
  const [input, setInput] = useState("");

  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestion = questionsData.filter(
    (el) =>
      input.trim() !== "" &&
      el.question.toLowerCase().includes(input.toLowerCase())
  );

  const sendMessage = (question: string, answer: string) => {
    setMessages((prev) => [
      ...prev,
      { role: "user", content: question },
      { role: "assistant", content: answer },
    ]);
    setInput("");
    setSelectedItem(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setSelectedItem(null);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" && input) {
        e.preventDefault();

        setSelectedItem((prev) => {
          if (suggestion.length && prev === suggestion.length - 1) return null;
          return prev !== null ? prev + 1 : 0;
        });
      } else if (e.key === "ArrowUp" && input) {
        e.preventDefault();

        setSelectedItem((prev) => {
          if (suggestion.length && prev === 0) return null;
          return prev !== null ? prev - 1 : suggestion.length - 1;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [suggestion, input]);

  useEffect(() => {
    if (selectedItem !== null) {
      buttonRef.current?.focus();
    } else if (selectedItem === null) {
      inputRef.current?.focus();
    }
  }, [selectedItem, suggestion.length]);

  return (
    <motion.div
      exit={{ opacity: 0, height: 0 }}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 450 }}
      className="bg-gray w-full rounded-xl py-4 relative flex flex-col space-y-3"
      id="chat-widget"
      aria-labelledby="chat-open-btn"
      data-id="chat-block"
    >
      <button
        className="absolute top-0 right-0 translate-y-1/2 -translate-x-1/2 cursor-pointer z-30"
        onClick={handleClose}
        aria-label="Close chat"
        data-id="chat-close-btn"
      >
        <Image
          src="/svg/delete.svg"
          height={25}
          width={25}
          aria-hidden="true"
          alt=""
          role="presentation"
        />
      </button>
      <div className="font-semibold tracking-wide pl-4 z-20">AI Assistant</div>
      <Messages messages={messages} />
      <CommonQuestions
        selected={selectedItem}
        suggestions={suggestion}
        selectQuestion={sendMessage}
        ref={buttonRef}
      />
      <input
        aria-label="Chat input"
        value={input}
        ref={inputRef}
        onChange={handleInputChange}
        role="combobox"
        aria-controls="suggestions-list"
        aria-expanded={suggestion.length > 0}
        placeholder="Type any question..."
        className="bg-white mx-4 py-2 px-3 rounded-md outline-black focus:outline-1"
      />
      <span aria-live="polite" className="sr-only">
        {suggestion.length > 0 &&
          `${suggestion.length} 5 options available. Arrow keys for navigation.`}
      </span>
    </motion.div>
  );
};

export default Chat;
