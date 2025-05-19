import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";
import React from "react";

const buttonVariants = cva(
  "border duration-400 rounded-md cursor-pointer items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default:
          "border-black bg-black text-white hover:bg-white hover:text-black",
        destructive:
          "border-black bg-black text-white hover:bg-white hover:text-red-500 hover:border-red-500",
      },
      size: {
        default: "px-3 py-2 text-sm",
        sm: "h-9 px-2 text-xs",
        lg: "h-11 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
