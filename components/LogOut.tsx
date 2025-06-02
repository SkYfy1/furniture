import { singOut } from "@/lib/actions/auth";
import React from "react";

const LogOut: React.FC<{ text: string }> = ({ text }) => {
  return (
    <button
      className="bg-gray px-2.5 py-2 rounded-sm hover:bg-black hover:text-white duration-250 text-xs flex items-center gap-1 cursor-pointer"
      onClick={singOut}
    >
      {text}
    </button>
  );
};

export default LogOut;
