import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { RegisteredTicket } from '../types.ts';

interface BottomBarProps {
  spotsLeft: number;
  userTicket: RegisteredTicket | null;
  onOpenRegisterModal: () => void;
  onViewTicket: () => void;
}

export const BottomBar: React.FC<BottomBarProps> = ({
  spotsLeft,
  userTicket,
  onOpenRegisterModal,
  onViewTicket
}) => {
  return (
    <aside className="fixed bottom-14 left-0 right-0 max-w-md mx-auto z-40 px-4 pointer-events-none">
      <div className="pointer-events-auto bg-white/95 backdrop-blur-xl border border-white/80 p-3.5 rounded-2xl shadow-[0_12px_32px_-4px_rgba(27,59,43,0.18)] flex items-center justify-between gap-3">
        {/* Left price & quota */}
        <div className="flex flex-col pl-1">
          <div className="flex items-baseline gap-1">
            <span className="text-[22px] font-extrabold text-[#032517] font-display">
              免费参与
            </span>
            <span className="text-[11px] font-semibold text-[#727973]">
              / 志愿同行
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="inline-block w-2 h-2 rounded-full bg-[#815433] animate-pulse" />
            <span className="text-[11px] text-[#815433] font-bold">
              {userTicket ? '您已成功占有名额' : `剩余 ${spotsLeft} 个名额`}
            </span>
          </div>
        </div>

        {/* Right CTA Button */}
        {userTicket ? (
          <button
            onClick={onViewTicket}
            className="flex-1 max-w-[180px] py-3 px-4 rounded-xl bg-[#1b3b2b] text-[#abcfb8] text-[13px] font-bold tracking-wide flex items-center justify-center gap-1.5 hover:bg-[#032517] active:scale-95 transition-all shadow-md"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>查看电子凭证</span>
          </button>
        ) : (
          <button
            onClick={onOpenRegisterModal}
            className="flex-1 max-w-[180px] py-3 px-5 rounded-xl bg-[#032517] text-white text-[14px] font-bold tracking-wide flex items-center justify-center gap-2 hover:bg-[#1b3b2b] active:scale-95 transition-all shadow-md"
          >
            <span>立即报名</span>
            <ArrowRight className="w-[18px] h-[18px]" />
          </button>
        )}
      </div>
    </aside>
  );
};
