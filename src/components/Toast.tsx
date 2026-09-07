import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-[#032517]/95 backdrop-blur-md text-white text-[13px] font-medium rounded-full shadow-xl border border-white/20 flex items-center gap-2 animate-fadeIn max-w-[90vw]">
      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
      <span className="truncate">{message}</span>
    </div>
  );
};
