import React from "react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "./ui/tooltip";
import { Button } from "./ui/Button";

const TooltipComponent: React.FC<{
  text: string;
  handler: () => void;
  children?: React.ReactNode;
}> = ({ text, children, handler }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild onClick={handler}>
          <Button size="sm">{children}</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipComponent;
