import React, { useState, useEffect } from 'react';

export const MainLayout = ({ children }) => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'dark bg-[#0a0a0a]' : 'bg-zinc-50'}`}>
      <div className="dark:text-zinc-100 text-zinc-900 min-h-screen relative overflow-hidden font-sans">
        {/* Премиальный background grid (Сетка) */}
        <div className="absolute inset-0 dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        {/* Рассеянный свет сверху */}
        <div className="absolute top-0 inset-x-0 h-[500px] w-full bg-gradient-to-b from-pink-500/10 dark:from-pink-500/5 to-transparent pointer-events-none"></div>

        {children(isDark, setIsDark)}
      </div>
    </div>
  );
};
