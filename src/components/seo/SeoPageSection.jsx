import { CheckCircle2 } from 'lucide-react';

export const SeoPageSection = ({ section }) => (
  <section className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.20)] md:p-8">
    <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">{section.title}</h2>
    <p className="mt-4 text-base leading-8 text-zinc-400">{section.body}</p>
    {section.bullets?.length > 0 && (
      <ul className="mt-6 grid gap-3">
        {section.bullets.map((bullet) => (
          <li key={bullet} className="flex gap-3 text-sm leading-6 text-zinc-300">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-pink-300" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    )}
  </section>
);
