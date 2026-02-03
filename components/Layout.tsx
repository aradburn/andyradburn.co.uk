import type { MenuData, MetaData } from "@/lib/types";

export function Layout({
  children,
  menu,
  meta,
}: {
  children: React.ReactNode;
  menu: MenuData;
  meta: MetaData;
}) {
  return (
    <main
      id="main-content"
      className="magicbackground fixed inset-x-0 top-16 z-0 flex max-h-[calc(100vh-4rem)] min-h-[calc(100vh-4rem)] flex-col overflow-y-auto overflow-x-hidden bg-surface scroll-mt-16"
    >
      <div className="relative z-0 flex min-h-0 flex-1 flex-col px-4 py-8 sm:px-6 md:px-8">
        <div className="mx-auto max-w-5xl">{children}</div>
      </div>
      <footer className="border-t border-surface-border bg-surface/90 py-6 text-center text-sm text-text-muted">
        <p>
          Copyright &copy; {new Date().getFullYear()} {meta.author}
        </p>
      </footer>
    </main>
  );
}
