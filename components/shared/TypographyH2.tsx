// interface Props {
//   children: React.ReactNode;
//   className?: string;
// }

// export const TypographyH2 = ({ children, className }: Props) => {
//   return (
//     <h2
//       className={`text-[20px] sm:text-[30px] leading-[20px] sm:leading-[35px] lg:text-[40px] lg:leading-[42px] font-extrabold font-display ${className}`}
//     >
//       {children}
//     </h2>
//   );
// };

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import React from "react";

const h2Variants = cva("", {
  variants: {
    variant: {
      default: "",
      primary:
        "text-[20px] sm:text-[30px] leading-[20px] sm:leading-[35px] lg:text-[40px] lg:leading-[42px] font-extrabold font-display",
      "primary-100": "text-[18px] sm:text-[28px] font-bold",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});
export interface H2Props
  extends React.HTMLProps<HTMLHeadingElement>,
    VariantProps<typeof h2Variants> {}

const TypographyH2 = React.forwardRef<HTMLHeadingElement, H2Props>(
  ({ className, variant, ...props }, ref) => {
    return (
      <h2
        className={cn(h2Variants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
TypographyH2.displayName = "TypographyH2";

export { TypographyH2 };
