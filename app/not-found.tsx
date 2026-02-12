import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[600px] px-4 py-10 text-center">
      <h1 className="my-8 text-6xl font-bold tracking-tight">404</h1>
      <p className="mb-4 font-semibold">Page not found :(</p>
      <p className="mb-6">The requested page could not be found.</p>
      <Link href="/home" className="text-accent underline">
        Back to home
      </Link>
    </div>
  );
}
