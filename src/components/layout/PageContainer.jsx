function PageContainer({ children, className = "" }) {
  return (
    <div
      className={`
        px-[var(--space-page-x)]
        md:px-[var(--space-page-x-md)]
        py-8
        max-w-6xl
        mx-auto
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default PageContainer;