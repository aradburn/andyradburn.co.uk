import { getMenu, getMetaData } from "@/lib/data";
import { Header } from "./Header";

export function Layout({ children }: { children: React.ReactNode }) {
  const menu = getMenu();
  const meta = getMetaData();
  return (
    <>
      <Header menu={menu} meta={meta} />
      <main
        id="main-content"
        className="magicbackground fixed inset-x-0 top-16 flex max-h-[calc(100vh-4rem)] min-h-[calc(100vh-4rem)] flex-col overflow-y-auto overflow-x-hidden bg-surface scroll-mt-16"
      >
        <div className="relative z-0 min-h-0 flex-1 px-4 py-8 sm:px-6 md:px-8">
          <div className="mx-auto max-w-5xl">{children}</div>
        </div>
        <footer className="mt-auto shrink-0 border-t border-surface-border bg-surface/90 py-6 text-center text-sm text-text-muted">
          <p>
            Copyright &copy; {new Date().getFullYear()} {meta.author}
          </p>
        </footer>
      </main>
    </>
  );
}
