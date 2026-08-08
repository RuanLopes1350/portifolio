import React from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full min-h-screen bg-theme-page text-theme-main font-sans">
      {children}
    </div>
  );
}
