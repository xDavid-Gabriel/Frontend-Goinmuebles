interface Props {
  children: React.ReactNode;
  className?: string;
}

export const TypographyH3 = ({ children, className }: Props) => {
  return (
    <h3 className={`text-[16px] sm:text-[1.5rem] font-bold ${className}`}>
      {children}
    </h3>
  );
};
