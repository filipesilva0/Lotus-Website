import React from 'react';

// Building blocks shared by every page except Home, so headings, widths and text sizes always match.

export const PageHeader: React.FC<{ eyebrow?: React.ReactNode; title: React.ReactNode; lead?: React.ReactNode; children?: React.ReactNode }> = ({ eyebrow, title, lead, children }) => (
  <header className="mx-auto max-w-6xl px-4 pb-12 pt-10 sm:px-6 sm:pt-16">
    {eyebrow && <div className="text-[0.875rem] font-medium text-[#30d158]">{eyebrow}</div>}
    <h1 className="mt-2 max-w-3xl text-[2.25rem] font-bold leading-[1.1] tracking-[-0.03em] text-white sm:text-[3rem]" style={{ textWrap: 'balance' }}>
      {title}
    </h1>
    {lead && <p className="mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-[#a1a1a6] sm:text-[1.1875rem]">{lead}</p>}
    {children}
  </header>
);

export const Section: React.FC<{ id?: string; title?: React.ReactNode; lead?: React.ReactNode; children: React.ReactNode; className?: string }> = ({ id, title, lead, children, className = '' }) => (
  <section id={id} className={`mx-auto mb-20 max-w-6xl scroll-mt-24 px-4 sm:px-6 ${className}`}>
    {title && <h2 className="text-[1.625rem] font-bold leading-tight tracking-tight text-white sm:text-[2rem]">{title}</h2>}
    {lead && <p className="mt-3 max-w-2xl text-[1rem] leading-relaxed text-[#a1a1a6]">{lead}</p>}
    <div className={title || lead ? 'mt-8' : ''}>{children}</div>
  </section>
);

/** Long-form text: docs, privacy, comparisons. */
export const Prose: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`prose-lotus max-w-3xl ${className}`}>{children}</div>
);

export const Kbd: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <kbd className="rounded-[5px] border border-white/15 bg-white/[0.06] px-1.5 py-0.5 font-sans text-[0.8125rem] text-[#f5f5f7]">{children}</kbd>
);

export const Em: React.FC<{ children: React.ReactNode }> = ({ children }) => <span className="font-medium text-[#f5f5f7]">{children}</span>;

/** A simple table that turns into stacked cards on phones. */
export const Table: React.FC<{ head: React.ReactNode[]; rows: React.ReactNode[][]; cols?: string; caption?: string }> = ({ head, rows, cols, caption }) => (
  <div className="overflow-x-auto rounded-[14px] border border-white/10">
    <table className="w-full min-w-[560px] border-collapse text-left text-[0.9375rem]">
      {caption && <caption className="sr-only">{caption}</caption>}
      <thead>
        <tr className="border-b border-white/10 bg-white/[0.03] text-[0.8125rem] text-[#86868b]">
          {head.map((h, i) => <th key={i} scope="col" className="px-4 py-3 font-medium" style={cols ? { width: cols.split(' ')[i] } : undefined}>{h}</th>)}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i} className="border-b border-white/[0.06] last:border-0 align-top">
            {r.map((c, j) => j === 0
              ? <th key={j} scope="row" className="px-4 py-3 font-medium text-white">{c}</th>
              : <td key={j} className="px-4 py-3 text-[#c7c7cc]">{c}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const Yes: React.FC<{ children?: React.ReactNode }> = ({ children }) => <span className="text-[#30d158]">{children ?? 'Yes'}</span>;
export const No: React.FC<{ children?: React.ReactNode }> = ({ children }) => <span className="text-[#86868b]">{children ?? 'No'}</span>;
export const Soon: React.FC<{ children?: React.ReactNode }> = ({ children }) => <span className="text-[#FF9F0A]">{children ?? 'Coming'}</span>;
