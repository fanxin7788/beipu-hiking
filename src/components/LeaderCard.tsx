import React, { useState } from 'react';
import { BadgeCheck, Phone, PhoneCall, MessageCircle, MessageSquare, Copy, Check } from 'lucide-react';
import { HikingEvent } from '../types.ts';

interface LeaderCardProps {
  event: HikingEvent;
  onShowToast: (msg: string) => void;
  onOpenContactModal: (channel: 'line' | 'whatsapp') => void;
}

export const LeaderCard: React.FC<LeaderCardProps> = ({
  event,
  onShowToast,
  onOpenContactModal
}) => {
  const [copied, setCopied] = useState(false);
  const leader = event.leader;

  const handleCopyPhone = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(leader.phone);
    setCopied(true);
    onShowToast(`已复制领队电话: ${leader.phone}`);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="px-4">
      <div className="bg-[#f6f3ec] rounded-xl p-4 border border-[#c1c8c2]/30 flex flex-col gap-3 shadow-sm">
        {/* Header Title & Verified Status */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-[#727973] uppercase tracking-wider">
            领队与紧急联络 · LEADERSHIP
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#032517] bg-[#c7ebd4]/70 px-2 py-0.5 rounded-full">
            <BadgeCheck className="w-3.5 h-3.5 fill-[#032517] text-[#c7ebd4]" />
            {leader.badge}
          </span>
        </div>

        {/* Leader Profile Row */}
        <div className="flex items-center gap-3.5">
          {/* Host Avatar with Badge */}
          <div className="relative shrink-0">
            <div className="w-13 h-13 w-12 h-12 rounded-full overflow-hidden border-2 border-[#1b3b2b] shadow-sm bg-[#e5e2db]">
              <img
                src={leader.avatar}
                alt={leader.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#032517] text-white flex items-center justify-center text-[10px] shadow-sm">
              <span className="text-[9px] font-bold">向导</span>
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-[17px] font-bold text-[#1c1c18] font-display">
                {leader.name}
              </h2>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-[#1b3b2b] text-[#abcfb8]">
                {leader.role}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1 text-[13px] text-[#424843]">
              <div className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-[#727973]" />
                <span className="font-mono font-medium text-[#1c1c18]">
                  {leader.phone}
                </span>
              </div>
              <button
                onClick={handleCopyPhone}
                title="复制电话号码"
                className="text-[11px] text-[#815433] hover:underline flex items-center gap-0.5"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? '已复制' : '复制'}</span>
              </button>
            </div>
          </div>

          {/* Dial Button */}
          <a
            href={`tel:${leader.phone}`}
            className="shrink-0 flex items-center gap-1 px-3.5 py-2 rounded-full bg-[#032517] text-white text-[13px] font-semibold hover:bg-[#1b3b2b] active:scale-95 transition-all shadow-sm"
          >
            <PhoneCall className="w-4 h-4" />
            <span>拨打电话</span>
          </a>
        </div>

        {/* Secondary Contact Channels */}
        <div className="pt-2 border-t border-[#c1c8c2]/20 flex items-center justify-between text-[13px] text-[#424843] flex-wrap gap-2">
          <span className="text-[11px] font-bold text-[#727973]">即时沟通群组：</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenContactModal('line')}
              className="px-2.5 py-1 rounded-lg bg-[#e5e2db] text-[#1c1c18] text-[11px] font-medium flex items-center gap-1 hover:bg-[#ebe8e1] active:scale-95 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>LINE 登山小队</span>
            </button>
            <button
              onClick={() => onOpenContactModal('whatsapp')}
              className="px-2.5 py-1 rounded-lg bg-[#e5e2db] text-[#1c1c18] text-[11px] font-medium flex items-center gap-1 hover:bg-[#ebe8e1] active:scale-95 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#815433]" />
              <span>WhatsApp 互助</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
