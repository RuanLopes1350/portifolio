'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface SecretAdminTriggerProps {
  children?: React.ReactNode;
}

export const SecretAdminTrigger: React.FC<SecretAdminTriggerProps> = ({ children }) => {
  const router = useRouter();
  const [clickCount, setClickCount] = useState(0);

  // 1. Keyboard Shortcut Listener (Ctrl + Shift + A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        router.push('/admin/dashboard');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  // 2. Secret Triple Click Listener
  const handleTripleClick = () => {
    setClickCount((prev) => {
      const next = prev + 1;
      if (next >= 7) {
        router.push('/admin/dashboard');
        return 0;
      }
      return next;
    });

    setTimeout(() => {
      setClickCount(0);
    }, 2000);
  };

  return (
    <span
      onClick={handleTripleClick}
      className="cursor-default select-none"
      title="Portfolio"
    >
      {children}
    </span>
  );
};
