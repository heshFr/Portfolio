import Link from "next/link";
import { Typeset } from "@/components/typeset";
import { PROJECTS } from "@/content/projects";

export const metadata = { title: "Work" };

export default function WorkIndex() {
  return (
    <div className="record py-16">
      <h1 className="display text-[length:var(--text-title)]">Work</h1>
      <ul className="mt-8">
        {PROJECTS.map((p) => (
          <li key={p.slug} className="py-4 border-b border-rule">
            <div className="flex items-baseline justify-between gap-4">
              {p.caseStudy ? (
                <Link href={`/work/${p.slug}`} className="display text-[1.15rem] hover:text-red">
                  {p.name}
                </Link>
              ) : (
                <span className="display text-[1.15rem]">{p.name}</span>
              )}
              <span className="label shrink-0">{p.period}</span>
            </div>
            <p className="mt-1">
              <Typeset>{p.summary}</Typeset>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
