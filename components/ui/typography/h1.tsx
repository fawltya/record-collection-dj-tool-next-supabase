type TypographyH1Props = {
  children: string;
  className?: string;
};

export function TypographyH1({ children, className = "" }: TypographyH1Props) {
  const combinedClassNames = `scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-7xl ${className}`;

  return <h1 className={combinedClassNames}>{children}</h1>;
}
