import React from 'react';

export const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#050505]">
      <div className="text-white min-h-screen relative overflow-hidden font-sans">
        {children}
      </div>
    </div>
  );
};
