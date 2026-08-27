import type { MDXComponents } from "mdx/types";

/**
 * Shared MDX rendering. Case studies get the site's type roles without having
 * to spell them out in every file.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => <h1 className="display text-[length:var(--text-title)] mt-14 mb-4" {...props} />,
    h2: (props) => <h2 className="display text-[1.35rem] mt-12 mb-3" {...props} />,
    p: (props) => <p className="mb-5" {...props} />,
    ...components,
  };
}
