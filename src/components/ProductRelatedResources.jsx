import React from 'react';
import { Link } from 'react-router-dom';

export const ProductRelatedResources = ({ blocks }) => {
  if (!blocks || blocks.length === 0) return null;

  return (
    <section className="py-6 px-6 bg-[#050505] relative z-10 w-full flex flex-col items-center gap-6">
      {blocks.map((block, i) => (
        <div key={i} className="max-w-3xl w-full p-6 md:p-8 rounded-2xl border border-white/[0.05] bg-white/[0.02]">
          <h3 className="text-white font-medium mb-4 text-base md:text-lg">{block.title}</h3>
          <ul className="space-y-3 text-sm md:text-base">
            {block.links.map((link, j) => (
              <li key={j} className="flex items-center gap-2">
                <span className="text-pink-500">•</span>
                <Link to={link.url} className="text-zinc-300 hover:text-pink-400 transition-colors underline underline-offset-4 decoration-white/10 hover:decoration-pink-400/50">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
};
