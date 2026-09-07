import React from 'react';
import { X, MessageSquare, MessageCircle, QrCode, Phone, CheckCircle } from 'lucide-react';
import { HikingEvent } from '../types.ts';

interface ContactModalProps {
  channel: 'line' | 'whatsapp' | null;
  onClose: () => void;
  event: HikingEvent;
  onShowToast: (msg: string) => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  channel,
  onClose,
  event,
  onShowToast
}) => {
  if (!channel) return null;

  const isLine = channel === 'line';
  const leader = event.leader;

  const handleJoin = () => {
    onShowToast(`已向 ${isLine ? 'LINE 登山小队' : 'WhatsApp 互助群'} 发起加入申请！`);
    setTimeout(onClose, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-sm bg-white rounded-2xl p-5 shadow-2xl border border-[#c1c8c2]/40 text-center flex flex-col items-center">
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 p-1 rounded-full text-[#727973] hover:text-[#1c1c18] hover:bg-[#ebe8e1] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon */}
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
            isLine ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-700'
          }`}
        >
          {isLine ? (
            <MessageSquare className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </div>

        <h3 className="text-[17px] font-bold text-[#1c1c18] font-display">
          {isLine ? '加入 LINE 登山小队群组' : '加入 WhatsApp 互助群组'}
        </h3>
        <p className="text-[12px] text-[#727973] mt-1 px-4 leading-relaxed">
          {isLine
            ? '群内提供新竹/竹北共乘接龙分配、装备即时答疑与行前天气路况第一手通报。'
            : '主要用于紧急联络留守、高山离线信令回传与突发状况协助。'}
        </p>

        {/* Simulated QR Code */}
        <div className="my-4 p-3 rounded-xl bg-[#f6f3ec] border border-[#c1c8c2]/30 flex flex-col items-center">
          <div className="w-32 h-32 bg-white rounded-lg p-2 shadow-inner flex flex-col items-center justify-center border border-[#c1c8c2]/30">
            <QrCode className="w-24 h-24 text-[#032517]" />
            <span className="text-[10px] text-[#727973] mt-1">扫码直接加入群组</span>
          </div>
          <span className="text-[11px] font-mono text-[#032517] font-semibold mt-2">
            群主：{leader.name} ({leader.phone})
          </span>
        </div>

        {/* Actions */}
        <div className="w-full space-y-2">
          <button
            onClick={handleJoin}
            className={`w-full py-2.5 rounded-xl text-white text-[13px] font-bold active:scale-95 transition-all shadow-sm flex items-center justify-center gap-1.5 ${
              isLine ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-[#815433] hover:bg-[#653d1e]'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            <span>一键申请入群</span>
          </button>
          <a
            href={`tel:${leader.phone}`}
            className="w-full py-2 rounded-xl bg-[#f6f3ec] text-[#1c1c18] text-[12px] font-medium hover:bg-[#ebe8e1] flex items-center justify-center gap-1 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#727973]" />
            <span>直接致电领队沟通</span>
          </a>
        </div>
      </div>
    </div>
  );
};
