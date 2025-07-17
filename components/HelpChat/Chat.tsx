import React, { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Messages from "./Messages";

interface Props {
  handleClose: () => void;
}

const Chat: React.FC<Props> = ({ handleClose }) => {
  //   const [ms, setMs] = useState([]);
  const [message, setMessage] = useState("");

  const sendMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setMessage("");
      console.log("Sended!");
    }
  };

  return (
    <motion.div
      exit={{ opacity: 0, height: 0 }}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 400 }}
      className="bg-gray w-full rounded-xl p-4 relative flex flex-col space-y-3"
    >
      <button
        className="absolute top-0 right-0 translate-y-1/2 -translate-x-1/2 cursor-pointer"
        onClick={handleClose}
      >
        <Image
          src="/svg/delete.svg"
          height={20}
          width={20}
          aria-hidden="true"
          alt=""
          role="presentation"
        />
      </button>
      <div className="font-semibold tracking-wide">AI Assistant</div>
      <Messages messages={[]} />
      <input
        value={message}
        onKeyDown={sendMessage}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type any question..."
        className="bg-white py-2 px-3 rounded-md outline-black focus:outline-1"
      />
    </motion.div>
  );
};

export default Chat;
