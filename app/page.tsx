export default function Home() {
  return (
    <div className="record py-16">
      <p className="display text-[length:var(--text-hero)]">
        I build the software companies run on internally: the systems that hold
        work, approvals, payroll and records, where being wrong is expensive and
        every change has to leave a trace.
      </p>
      <p className="mt-8">
        Scaffold placeholder. The real home page arrives in milestone 3. This
        page exists so the type scale, the paper and the record grid can be
        judged: <span className="num">190</span> screens,{" "}
        <span className="num">215</span> database tables and about{" "}
        <span className="num">100,000</span> lines of code.
      </p>
      <p className="in-margin note mt-8">
        Verification margin. On a wide screen this note sits beside the prose it
        belongs to. Below 62rem it falls inline.
      </p>
      <p className="in-gutter label mt-8">Section label</p>
      <p className="mt-8">
        On a screen wider than 82rem the label above hangs in the left gutter.
        Everywhere else it sits inline, above its section.
      </p>
    </div>
  );
}
