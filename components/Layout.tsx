export function Layout({ children }: { children: React.ReactNode }) {
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
        <div className="relative z-0 flex min-h-0 flex-1 flex-col px-0 py-8">
          {/*<div className="mx-auto min-w-0 max-w-full sm:max-w-max">*/}
            {children}
          {/*</div>*/}
        </div>
      </main>
    </>
  );
}
