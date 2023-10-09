import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center  transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: "",
        "primary-red":
          "rounded-[12px]  sm:text-[22px] p-[8px_1rem] bg-tomato font-bold text-white font-display hover:bg-tomato/80",
        "primary-red-100":
          "rounded-[12px] sm:text-[22px] p-[8px_1rem] bg-tomato/80 font-bold text-white font-display hover:bg-tomato",
        "primary-blue":
          "rounded-[12px] sm:text-[22px] p-[8px_1rem] bg-forest-green font-bold text-white font-display hover:bg-blue-forest-green/80",
        "primary-teal":
          "rounded-[12px] sm:text-[22px] p-[8px_1rem] bg-teal font-bold text-white font-display hover:bg-teal/80",
        "outline-100":
          "border-[2px] border-white rounded-full p-[7px_30px] text-white font-bold hover:bg-white hover:bg-blue-green hover:border-blue-gree ",
        details:
          "rounded-[15px] border-[2px] border-teal text-gray62 py-[5px] px-[20px] hover:bg-teal hover:text-white font-normal",
        outline:
          "border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 rounded-md",
        ghost: "hover:bg-slate-100 hover:text-slate-900 rounded-md",
      },
      size: {
        default: "",
        sm: "",
        lg: "",
        icon: "",
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
