import Link from "next/link";

export const metadata = { title: "Not found" };

export default function NotFound() {
  return (
    <div className="record pt-20 pb-32">
      <p className="label mb-3">404</p>
      <h1 className="display text-[length:var(--text-title)]">
        There is no record at this address.
      </h1>
      <p className="mt-6">
        The page you asked for does not exist, which is at least an honest
        answer. The{" "}
        <Link href="/work" className="link">
          work
        </Link>{" "}
        is the useful place to go from here, or{" "}
        <Link href="/" className="link">
          start at the beginning
        </Link>
        .
      </p>
    </div>
  );
}
