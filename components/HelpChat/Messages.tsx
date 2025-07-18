import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface Props {
  messages: Message[];
}

const Messages: React.FC<Props> = ({ messages }) => {
  const ref = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (messages)
      ref.current?.scrollTo({
        behavior: "smooth",
        top: ref.current.scrollHeight,
      });
  }, [messages]);

  return (
    <div
      className="flex-col flex gap-2 text-sm overflow-y-auto flex-1 relative chat-scrollbar pl-4 pr-2"
      ref={ref}
    >
      {!messages.length && (
        <div className="flex-1 absolute top-1/2 left-0 -translate-y-1/2 text-sm pl-6">
          <div className="font-medium text-xl">Hello there!</div>{" "}
          <span className="text-lg">How can I help you today?</span>
        </div>
      )}
      {messages.map((message, index) => (
        <div
          key={`${message.role}-${index}`}
          className={cn(
            "whitespace-pre-wrap p-2 rounded-md w-fit",
            message.role === "assistant"
              ? "bg-black text-white"
              : "bg-white self-end shadow-md"
          )}
        >
          {message.content}
        </div>
      ))}
    </div>
  );
};

export default Messages;
