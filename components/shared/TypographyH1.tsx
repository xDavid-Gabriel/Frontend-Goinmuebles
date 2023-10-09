interface Props {
  children: React.ReactNode;
  className?: string;
}
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import React from "react";

const h1Variants = cva("", {
  variants: {
    variant: {
      default: "",
      primary:
        "text-[38px] font-bold sm:text-[68px] lg:leading-[80px] xl:leading-[122px] lg:text-[90px] xl:text-[128px] font-display",
      "primary-100": "text-[20px] font-bold sm:text-[28px] font-display",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
export interface H1Props
  extends React.HTMLProps<HTMLHeadingElement>,
    VariantProps<typeof h1Variants> {}

const TypographyH1 = React.forwardRef<HTMLHeadingElement, H1Props>(
  ({ className, variant, ...props }, ref) => {
    return (
      <h1
        className={cn(h1Variants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
TypographyH1.displayName = "TypographyH1";

export { TypographyH1 };
