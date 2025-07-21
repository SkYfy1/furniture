"use client";

import React, { useState } from "react";
import { AnimatePresence } from "motion/react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Chat from "./Chat";

const Help = () => {
  const [showChat, setShowChat] = useState(false);
  return (
    <aside className="w-[350] fixed bottom-2 right-2 flex flex-col">
      <button
        className={cn(
          "cursor-pointer p-3 rounded-full bg-gray hover:bg-gray-200 duration-400 mx-2 self-end",
          showChat && "hidden"
        )}
        data-id="chat-open-btn"
        onClick={() => setShowChat((prev) => !prev)}
        aria-label="AI Help Chat"
        aria-expanded={showChat}
        aria-controls="chat-widget"
      >
        <Image
          src="/svg/help.svg"
          height={50}
          width={50}
          aria-hidden="true"
          alt=""
          role="presentation"
        />
      </button>
      <AnimatePresence>
        {showChat && <Chat handleClose={() => setShowChat(false)} />}
      </AnimatePresence>
    </aside>
  );
};

export default Help;
