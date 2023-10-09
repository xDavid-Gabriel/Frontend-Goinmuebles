import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "outline-none w-full disabled:opacity-50 disabled:disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default:
          "rounded-[20px] border-[2px] font-josefin p-[13px_18px] border-gray62",
        "primary-red":
          "rounded-[20px] border-[2px] font-josefin p-[13px_18px] border-tomato",
        "primary-teal":
          "rounded-[20px] border-[2px] font-josefin p-[13px_18px] border-teal",
        "primary-normal":
          "py-4 px-12 text-gray62 placeholder:text-gray62 font-josefin sm:text-[20px]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  asChild?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
