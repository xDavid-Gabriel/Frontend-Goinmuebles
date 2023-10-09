import React, { MouseEventHandler } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
interface Props {
  fieldSetsCount: number;
  handleRemoveFields: MouseEventHandler<HTMLButtonElement>;
  handleAddFields: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  variant: "bg-tomato/80" | "bg-teal";
}
export const ButtonPlusMinus = ({
  fieldSetsCount,
  handleRemoveFields,
  handleAddFields,
  className = "mx-auto col-span-12 sm:mr-0 sm:ml-auto flex gap-4",
  variant,
}: Props) => {
  return (
    <div className={`${className}`}>
      {fieldSetsCount <= 1 ? (
        ""
      ) : (
        <button
          className={`rounded-full disabled:opacity-50 disabled:cursor-not-allowed w-[45px] h-[45px] sm:w-[55px] sm:h-[55px] self-end text-[20px] sm:text-[30px] text-white grid place-content-center mx-auto col-span-12 sm:mr-0 sm:ml-auto ${variant}`}
          type="button"
          onClick={handleRemoveFields}
        >
          <FaMinus />
        </button>
      )}

      {fieldSetsCount >= 3 ? (
        ""
      ) : (
        <button
          className={`rounded-full disabled:opacity-50 disabled:cursor-not-allowed w-[45px] h-[45px] sm:w-[55px] sm:h-[55px] self-end text-[20px] sm:text-[30px] text-white grid place-content-center ${variant}`}
          type="button"
          onClick={handleAddFields}
        >
          <FaPlus />
        </button>
      )}
    </div>
  );
};
