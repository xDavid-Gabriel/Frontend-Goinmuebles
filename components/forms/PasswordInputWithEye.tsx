"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToggle } from "@/hooks";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";

interface Props {
  control: any;
  name: "password";
  variant: "primary-red" | "primary-teal" | "primary-normal";
  className?: string;
}

export const PasswordInputWithEye = ({
  control,
  name,
  variant,
  className,
}: Props) => {
  const { state: eyes, toggle: toggleEyes } = useToggle();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex w-full flex-col gap-3">
          <div className="relative">
            <FormControl>
              <Input
                type={eyes ? "text" : "password"}
                {...field}
                placeholder="Contraseña"
                variant={variant}
                className={className}
              />
            </FormControl>
            {eyes ? (
              <i
                className="absolute right-5 top-[50%] translate-y-[-50%] text-[20px] cursor-pointer"
                onClick={toggleEyes}
              >
                <FaEyeSlash />
              </i>
            ) : (
              <i
                className="absolute right-5 top-[50%] translate-y-[-50%] text-[20px] cursor-pointer"
                onClick={toggleEyes}
              >
                <IoEyeSharp />
              </i>
            )}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
