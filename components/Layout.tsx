interface LayoutProps {
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function Layout({ children, footer }: LayoutProps) {
  return (
    <>
      <div
        className="magicbackground fixed pointer-events-none absolute inset-0 -z-10"
        aria-hidden
      />
      <main
        id="main-content"
        className="relative z-0 flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden scroll-mt-16"
      >
        <div className="min-h-0 min-w-0 shrink-0">{children}</div>
        {footer != null ? (
          <div className="relative z-10 shrink-0">{footer}</div>
        ) : null}
      </main>
    </>
  );
}
