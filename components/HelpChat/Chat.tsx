import React, { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Messages from "./Messages";
import CommonQuestions from "./CommonQuestions";

interface Props {
  handleClose: () => void;
}

const Chat: React.FC<Props> = ({ handleClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = (question: string, answer: string) => {
    setMessages((prev) => [
      ...prev,
      { role: "user", content: question },
      { role: "assistant", content: answer },
    ]);
    setInput("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <motion.div
      exit={{ opacity: 0, height: 0 }}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 450 }}
      className="bg-gray w-full rounded-xl py-4 relative flex flex-col space-y-3"
    >
      <button
        className="absolute top-0 right-0 translate-y-1/2 -translate-x-1/2 cursor-pointer z-30"
        onClick={handleClose}
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
      <CommonQuestions suggestions={input} selectQuestion={sendMessage} />
      <input
        value={input}
        onChange={handleInputChange}
        placeholder="Type any question..."
        className="bg-white mx-4 py-2 px-3 rounded-md outline-black focus:outline-1"
      />
    </motion.div>
  );
};

export default Chat;
