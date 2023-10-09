import React from "react";
import { ImSpinner5 } from "react-icons/im";

export const BasicLoading = ({
  className = "flex-col",
  name = "Cargando...",
}: {
  className?: string;
  name?: string;
}) => {
  return (
    <div className={`flex items-center justify-center h-full ${className}`}>
      <div className="text-2xl animate-spin">
        <ImSpinner5 />
      </div>
      <p className="text-inherit">{name}</p>
    </div>
  );
};
