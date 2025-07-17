import React from "react";

interface Props {
  messages: unknown[];
}

const Messages: React.FC<Props> = ({ messages: ms }) => {
  return (
    <div className="flex-col flex gap-1 text-sm overflow-y-hidden flex-1 relative">
      {!ms.length && (
        <div className="flex-1 absolute top-1/2 left-0 -translate-y-1/2 text-sm px-2">
          <div className="font-medium">Hello there!</div>{" "}
          <span className="text-xs">How can I help you today?</span>
        </div>
      )}
      {/* <div className="p-2 rounded-md bg-black text-white w-fit">Text</div>
      <div className="p-2 rounded-md bg-white w-fit self-end">
        DSADASDASDASDASDAS
      </div>
      <div className="p-2 rounded-md bg-black text-white w-fit">Text</div>
      <div className="p-2 rounded-md bg-white w-fit self-end">Tdsadasdas</div> */}
    </div>
  );
};

export default Messages;
