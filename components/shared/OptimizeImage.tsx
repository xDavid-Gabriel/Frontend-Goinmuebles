// OptimizeImage.tsx
import React, { FC } from "react";

interface OptimizeImageProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  lazy?: boolean;
  className?: string;
}

export const OptimizeImage: FC<OptimizeImageProps> = ({
  src,
  alt,
  width = "auto",
  height = "auto",
  lazy = true,
  className = "",
}) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={lazy ? "lazy" : "eager"}
    />
  );
};
