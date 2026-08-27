import Link from "next/link";

export default function NotFound() {
  return (
    <div className="record py-16">
      <h1 className="display text-[length:var(--text-title)]">No record here.</h1>
      <p className="mt-6">
        That page does not exist. <Link href="/work" className="text-red underline underline-offset-4">See the work</Link>.
      </p>
    </div>
  );
}
