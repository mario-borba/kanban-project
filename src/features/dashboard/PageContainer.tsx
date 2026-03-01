export const PageContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const paddingX = "px-6";

  return (
    <div className={`w-full max-w-7xl mx-auto ${paddingX} py-8`}>
      {children}
    </div>
  );
};
