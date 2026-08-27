import type { MDXComponents } from "mdx/types";

/**
 * Shared MDX rendering. Case studies get the site's type roles without having
 * to spell them out in every file. Page and section headings come from the
 * case-study components, so h1 and h2 are deliberately not mapped here.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h3: (props) => <h3 className="display text-[1.15rem] mt-9 mb-3" {...props} />,
    p: (props) => <p className="mb-5 last:mb-0" {...props} />,
    ul: (props) => <ul className="mb-5 pl-5 list-disc marker:text-rule" {...props} />,
    li: (props) => <li className="mb-2 pl-1" {...props} />,
    a: (props) => <a className="link" {...props} />,
    hr: () => <hr className="my-10 border-rule" />,
    table: (props) => (
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse text-[0.9em]" {...props} />
      </div>
    ),
    th: (props) => (
      <th
        className="label text-left align-bottom border-b border-ink pb-2 pr-5 last:pr-0"
        {...props}
      />
    ),
    td: (props) => (
      <td className="border-b border-rule py-2 pr-5 last:pr-0 align-top" {...props} />
    ),
    ...components,
  };
}
